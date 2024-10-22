import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  productId!: string; // Переменная для хранения ID товара
  isEditMode = false; // Флаг, чтобы знать, редактирование это или создание

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, // Для доступа к параметрам маршрута
    private productAdminService: ProductAdminService,
    private productService: ShopService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Получаем ID из параметров URL
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || 'Empty';
      console.log("!!!!!!!!!!!!!!! ProductID !!!!!!!!!!!!")
      console.log(this.productId)// Получаем ID из URL
      if (this.productId) {
        this.isEditMode = true; // Устанавливаем флаг редактирования
        this.loadProduct(Number(this.productId)); // Загружаем данные товара для редактирования
      }
    });
  }

  // Инициализация формы
  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      typeForBuy: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      pictures: ['', Validators.required],
      description: ['', Validators.required],
      variants: this.fb.array([]) // FormArray для вариантов продукта
    });
  }

  // Получаем массив вариантов
  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  // Добавление нового варианта
  addVariant(): void {
    const variantForm = this.fb.group({
      size: ['', Validators.required],
      color: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
    this.variants.push(variantForm);
  }

  // Удаление варианта по индексу
  removeVariant(index: number): void {
    this.variants.removeAt(index);
  }

  // Загрузка товара для редактирования
  loadProduct(id: number): void {
    this.productService.getOneEquipment(id).subscribe(
      (product: Equipment) => {
        console.log('!!!!!!!!!!! Updated Product !!!!!!!!!!!!! ')
        console.log(product)
        this.productForm.patchValue({
          name: product.name,
          type: product.type,
          typeForBuy: product.typeForBuy,
          price: product.price,
          pictures: product.pictures,
          description: product.description,
        });

        // Заполняем варианты продукта
        product.productVariants.forEach(variant => {
          const variantForm = this.fb.group({
            size: [variant.size, Validators.required],
            quantity: [variant.quantity, [Validators.required, Validators.min(0)]]
          });
          this.variants.push(variantForm);
        });
      },
      error => {
        console.error('Error loading product', error);
        this.toastr.error("Ошибка при загрузке товара!")
      }
    );
  }

  // Отправка формы для создания или обновления
  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Equipment = this.productForm.value;

      if (this.isEditMode) {
        // Если режим редактирования, отправляем запрос на обновление
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
        // Иначе создаем новый продукт
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
