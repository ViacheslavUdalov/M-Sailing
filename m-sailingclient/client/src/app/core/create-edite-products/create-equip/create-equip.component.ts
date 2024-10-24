import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProductAdminService} from "../product-admin.service";
import {Equipment} from "../../../models/equipment";
import {ShopService} from "../../../shop/shop.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-equip',
  templateUrl: './create-equip.component.html',
})
export class CreateEquipComponent implements OnInit {

  productForm!: FormGroup;
  productId!: string;
  isEditMode = false;
  typeForBuy!: string;
  count = 0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productAdminService: ProductAdminService,
    private productService: ShopService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || 'Empty';
      // console.log("!!!!!!!!!!!!!!! ProductID !!!!!!!!!!!!")
      // console.log(this.productId)// Получаем ID из URL
      if (this.productId) {
        this.isEditMode = true; // Устанавливаем флаг редактирования
        this.loadProduct(Number(this.productId)); // Загружаем данные товара для редактирования
      }
    });
    this.productVariants.controls.forEach(control => {
      this.subscribeToQuantity(control);
    });
    this.updateCount();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      pictures: ['', Validators.required],
      description: ['', Validators.required],
      productVariants: this.fb.array([])
    });
  }

  get productVariants(): FormArray {
    return this.productForm.get('productVariants') as FormArray;
  }

  addVariant(): void {
    const variantForm = this.fb.group({
      size: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      productId: this.productId
    });

    this.productVariants.push(variantForm);
    this.subscribeToQuantity(variantForm)
    this.updateCount();
  }
  subscribeToQuantity(variantForm: AbstractControl) {
    variantForm.get('quantity')?.valueChanges.subscribe(() => {
      console.log("IN SUBSRIBE" + this.count)
      this.updateCount()
    })
  }
updateCount() {
    this.count = this.productVariants.controls.reduce((total, variant) => {
      const quantity = Number(variant.get('quantity')?.value)  || 0;
      console.log(quantity)
      console.log(total + quantity)
      return total + quantity;
    }, 0)
  console.log(this.count)
  this.typeForBuy = this.count > 0 ? "Есть в наличии" : "Под заказ"
}
  removeVariant(index: number): void {
    this.productVariants.removeAt(index);
    this.updateCount();
  }

  loadProduct(id: number): void {
    this.productService.getOneEquipment(id).subscribe(
      (product: Equipment) => {
        // console.log('!!!!!!!!!!! Updated Product !!!!!!!!!!!!! ')
        // console.log(product)
        this.productForm.patchValue({
          name: product.name,
          type: product.type,
          price: product.price,
          pictures: product.pictures,
          description: product.description,
        });

        product.productVariants.forEach(variant => {
          const variantForm = this.fb.group({
            size: [variant.size, Validators.required],
            quantity: [variant.quantity, [Validators.required, Validators.min(0)]],
            productId: [variant.productId],
            id: [variant.id]
          });

          this.productVariants.push(variantForm);
          this.subscribeToQuantity(variantForm)
          this.updateCount()
        });
        this.typeForBuy = this.count > 0 ? "Есть в наличии" : "Под заказ"
      },
      error => {
        console.error('Error loading product', error);
        this.toastr.error("Ошибка при загрузке товара!")
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      let productData: Equipment = this.productForm.value;
      productData.typeForBuy = this.typeForBuy;
      console.log(productData)
      if (this.isEditMode) {
        this.productAdminService.updateProduct(Number(this.productId), productData).subscribe(
          response => {
            console.log('Product updated successfully', response);
            this.toastr.success('Товар обновлён!')
          },
          error => {
            console.log('Error while updating product', error);
            this.toastr.error('Ошибка!' + error)
          }
        );
      } else {
        this.productAdminService.createProduct(productData).subscribe(
          response => {
            console.log('Product created successfully', response);
            this.toastr.success('Товар Создан!')
          },
          error => {
            console.log('Error while creating product', error);
            this.toastr.error('Ошибка!' + error)
          }
        );
      }
    } else {
      console.log('Form is invalid');
      this.toastr.error('Form is invalid')
    }
  }
}
