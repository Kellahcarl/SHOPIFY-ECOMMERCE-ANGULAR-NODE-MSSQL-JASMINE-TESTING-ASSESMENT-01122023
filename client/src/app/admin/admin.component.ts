import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../types/productService';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  addProductForm: FormGroup;
  editProductForm: FormGroup;
  searchTerms: string = '';

  products: Product[] = [];
  user_name: string | null = localStorage.getItem('user_name');

  ngOnInit() {
    this.initForm();
    this.getProducts();
  }

  token = localStorage.getItem('token');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private authservice: AuthService
  ) {
    this.addProductForm = this.fb.group({
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      title: ['', Validators.required],
      stock: ['', Validators.required],
    });
    this.editProductForm = this.fb.group({
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      title: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  private initForm() {
    this.addProductForm = this.fb.group({
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      title: ['', Validators.required],
      stock: ['', Validators.required],
    });
    this.editProductForm = this.fb.group({
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      title: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  logout = () => {
    this.authservice.logout();
  };

  getProducts = async () => {
    if (!this.token) {
      console.error('Token not found.');
      return;
    }

    try {
      this.products = await this.productService.getAllProducts(this.token);

      // console.log(this.products);
    } catch (error) {
      console.log(error);
    }
  };

  onAddProductSubmit = () => {
    if (this.addProductForm.valid) {
      const productDetails = this.addProductForm.value;
      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      // console.log(productDetails);

      this.productService
        .createProduct(productDetails, this.token)
        .then((res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              icon: 'success',
              title: 'product added successfully!',
              text: `${res.message}`,
            });

            this.initForm();
            this.getProducts();
            // this.router.navigate(['/admin']);
          }
          if (res.error) {
            Swal.fire({
              icon: 'error',
              title: 'Please try Again',
              text: `${res.error}`,
            });
          }
        })
        .catch((error) => {
          console.log(error);

          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong!',
            icon: 'error',
          });
        });
    }
  };

  editProduct = (product_id: string) => {
    localStorage.setItem('product_id', product_id);
    // console.log(product_id);
    this.fetchSingleProduct();
  };

  onEditProductSubmit = () => {
    const product_id = localStorage.getItem('product_id');

    if (this.editProductForm.valid) {
      const productDetails = this.editProductForm.value;

      productDetails.product_id = product_id;

      if (!this.token || !product_id) {
        console.error('Token or Tour ID not found.');
        return;
      }
      // console.log(productDetails);

      this.productService
        .updateProduct(productDetails, this.token)
        .then((res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              icon: 'success',
              title: 'Tour edited successfully!',
              text: `${res.message}`,
            });

            this.initForm();
            this.getProducts();
            localStorage.removeItem('product_id');
          }
          if (res.error) {
            Swal.fire({
              icon: 'error',
              title: 'Please try Again',
              text: `${res.error}`,
            });
          }
        })
        .catch((error) => {
          console.log(error);

          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong!',
            icon: 'error',
          });
        });
    }
  };

  fetchSingleProduct = () => {
    const product_id = localStorage.getItem('product_id');

    if (!this.token || !product_id) {
      console.error('Token or Tour ID not found.');
      return;
    }

    this.productService
      .getProductById(product_id, this.token)
      .then((product) => {
        // console.log(product);

        this.editProductForm.patchValue({
          price: product[0].price,
          description: product[0].description,
          image: product[0].image,
          title: product[0].title,
          stock: product[0].stock,
        });

        // console.log(this.editProductForm.value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteProduct = async (product_id: string, product_title: string) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton:
            'btn btn-success text-white p-2 rounded m-2 cursor-pointer ',
          cancelButton:
            'btn btn-danger text-white p-2 rounded m-2  cursor-pointer ',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title:`Delete ${product_title}! <br> Are you sure?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it !',
          cancelButtonText: 'No, cancel !  ',
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            if (!this.token) {
              console.error('Token not found.');
              return;
            }
            await this.productService.deleteProductById(product_id, this.token);
            await this.getProducts();

            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: `${product_title} has been deleted.`,
              icon: 'success',
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: 'Cancelled',
              text: `${product_title} is safe :)`,
              icon: 'error',
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
}
