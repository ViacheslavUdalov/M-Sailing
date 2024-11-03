import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {ProductAdminService} from "../product-admin.service";
import {ShopService} from "../../../shop/shop.service";
import {ToastrService} from "ngx-toastr";
import {Equipment} from "../../../models/equipment";
import {Armament} from "../../../models/armament";

@Component({
  selector: 'app-create-armament',
  templateUrl: './create-armament.component.html',
  styleUrls: ['./create-armament.component.less']
})
export class CreateArmamentComponent {
  productForm!: FormGroup;
  productId!: string;
  isEditMode = false;
  typeForBuy!: string;
  count = 0;
  newImagePreview: SafeUrl | null = null;
  newImageFile: File | null = null;
  currentImage: string = '';
  types = [
    {
      value: '',
      name: 'Все типы'
    },
    {
      value: 'вооружение',
      name: 'Вооружение'
    },
    {
      value: 'рангоут',
      name: 'Рангоут'
    },
    {
      value: 'парус',
      name: 'Парус'
    },
    {
      value: 'чехлы',
      name: 'Чехлы'
    },
    {
      value: 'optimist',
      name: 'Optimist'
    }
  ]
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productAdminService: ProductAdminService,
    private productService: ShopService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || 'Empty';
      if (this.productId) {
        this.isEditMode = true;
        this.loadProduct(Number(this.productId));
      }
    });
  }


  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.newImageFile = file;

      this.newImagePreview = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(file)
      );
    }
  }

  // не используется
  uploadImage() {
    if (!this.newImageFile) {
      console.log('No new image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.newImageFile, this.newImageFile.name);

    this.productAdminService.uploadProductImage(formData).subscribe(
      (response) => {
        console.log('Image uploaded successfully');
        this.currentImage = response.imageUrl;
      },
      (error) => {
        console.error('Error uploading image', error);
      }
    );
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      pictures: this.currentImage ? this.currentImage : this.newImageFile,
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]]
    });
  }


  subscribeToQuantity(variantForm: AbstractControl) {
    variantForm.get('quantity')?.valueChanges.subscribe(() => {
      console.log("IN SUBSRIBE" + this.count)
      this.updateCount()
    })
  }
updateCount() {
    this.count = this.productForm.get('quantity')?.value
  this.typeForBuy = this.count > 0 ? "Есть в наличии" : "Под заказ"
  }
  loadProduct(id: number): void {
    this.productService.getOneArmament(id).subscribe(
      (product: Armament) => {
        // console.log('!!!!!!!!!!! Updated Product !!!!!!!!!!!!! ')
        // console.log(product)
        this.productForm.patchValue({
          name: product.name,
          type: product.type,
          price: product.price,
          pictures: product.pictures,
          description: product.description,
          quantity: product.quantity
        });
        this.subscribeToQuantity(this.productForm)
        this.updateCount()
        this.currentImage = product.pictures;
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
      let productData: Armament = this.productForm.value;
      productData.typeForBuy = this.typeForBuy;
      if (this.newImageFile) {
        productData.pictures =  `assets/productsimages/${this.newImageFile.name}`;
        console.log(productData)
      } else {
        productData.pictures = this.currentImage
      }





      if (this.isEditMode) {
        this.productAdminService.updateArmamProduct(Number(this.productId), productData).subscribe(
          response => {
            console.log('Product updated successfully', response);
            if (this.newImageFile) {
              const formData = new FormData();
              formData.append('image', this.newImageFile, this.newImageFile.name);
              this.productAdminService.uploadProductImage(formData).subscribe(() => {
                this.toastr.success('Файл изображение загружен!')
              }, error => {
                console.log(error)
                this.toastr.error('Ошибка загрузки файла!' + error.error)
              })
              this.toastr.success('Товар обновлён!')
            } },
          error => {
            console.log('Error while updating product', error);
            this.toastr.error('Ошибка!' + error)
          }
        );
      } else {
        this.productAdminService.createArmamProduct(productData).subscribe(
          response => {
            console.log('Product created successfully', response);
            if (this.newImageFile) {
              const formData = new FormData();
              formData.append('image', this.newImageFile, this.newImageFile.name);
              this.productAdminService.uploadProductImage(formData).subscribe(() => {
                this.toastr.success('Файл изображение загружен!')
              }, error => {
                this.toastr.error('Ошибка загрузки файла!' + error)
              })
              this.toastr.success('Товар Создан!')
            }},
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
