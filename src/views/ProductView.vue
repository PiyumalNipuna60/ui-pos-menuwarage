<template>
  <div class="product-page-main-controller">
    <section class="navigation-panel-product-container">
      <NavigationPanel />
    </section>
    <div class="product-form-container main-area-container">
      <div class="product-form-container-header"><h2>PRODUCT MANAGE</h2></div>
      <div class="product-form-container-body mt-5">
        <div>
          <section class="formgrid grid justify-content-center">
            <section class="username-field-container field col-12 md:col-4 mb-5">
              <FloatLabel variant="on">
                <Dropdown
                  v-model="selectedProduct"
                  :options="products"
                  optionLabel="name"
                  filter
                  class="w-full"
                  @change="setSelectedProduct"
                >
                  <template #option="slotProps">
                    <div v-if="slotProps.option" class="flex align-items-center s">
                      <div>{{ slotProps.option.id }} &nbsp; - &nbsp;</div>

                      <div>{{ slotProps.option.name }}</div>
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                </Dropdown>
                <label for="username">Search a product by id or name</label>
              </FloatLabel>
            </section>
          </section>
          <section class="formgrid grid justify-content-center">
            <section class="username-field-container field col-12 md:col-4 mr-5 mb-5">
              <FloatLabel variant="on">
                <InputText id="username" v-model="productList.selectedProduct.id" />
                <label for="username">Enter product id</label>
              </FloatLabel>
            </section>
            <section class="username-field-container field col-12 md:col-4 mb-5">
              <FloatLabel variant="on">
                <InputText id="username" v-model="productList.selectedProduct.name" />
                <label for="username">Enter product name</label>
              </FloatLabel>
            </section>
          </section>
          <section class="formgrid grid justify-content-center mt-3">
            <div class="field col-12 md:col-2 mr-5">
              <Button
                :label="productList.selectedProduct.id ? 'UPDATE PRODUCT' : 'SAVE PRODUCT'"
                icon="pi pi-save"
                iconPos="right"
                @click="saveProduct"
              ></Button>
            </div>
            <div class="field col-12 md:col-2">
              <Button
                label="CLEAR"
                icon="pi pi-times"
                iconPos="right"
                @click="clearInputFields"
              ></Button>
            </div>
          </section>
        </div>
        <Divider />
        <section class="product-data-table-section mt-5">
          <DataTable
            v-model:selection="product"
            :value="products"
            paginator
            dataKey="id"
            selectionMode="single"
            :metaKeySelection="false"
            :rows="5"
            @rowSelect="onRowSelect"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
          >
            <Column field="id" header="ID" style="width: 20%"></Column>
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column field="image" header="Image" style="width: 20%"></Column>
            <Column field="createdAt" header="Created Date" style="width: 25%"></Column>
            <Column field="action" header="Action" style="width: 10%">
              <template #body="slotProps">
                <Button
                  label="Remove"
                  icon="pi pi-times"
                  iconPos="right"
                  @click="removeProduct(slotProps)"
                ></Button>
              </template>
            </Column>
          </DataTable>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore'
import { onMounted, ref } from 'vue'
import NavigationPanel from '../components/NavigationPanel.vue'

const productStore = useProductStore()
const { productList } = useProductStore()

const product = ref(null)
const products = ref([])
const selectedProduct = ref(null)

onMounted(async () => {
  await loadProductsData()
  console.log('products list________', productList)
})

const loadProductsData = async () => {
  try {
    await productStore.loadProducts()
    products.value = productList.data
  } catch (error) {
    console.error('Product data load failed', error)
  }
}

const onRowSelect = () => {
  productList.selectedProduct = product.value
  console.log('products list________', productList.selectedProduct)
}

const setSelectedProduct = () => {
  productList.selectedProduct = selectedProduct.value
  console.log('products list________', productList.selectedProduct)
}

const saveProduct = async () => {
  try {
    productList.selectedProduct.id
      ? productStore.updateProductDetails()
      : productStore.saveProduct()
  } catch (error) {
    console.error('product data load failed', error)
  }
}

const removeProduct = async (params) => {
  productStore.removeProduct(params.data.id)
}

const clearInputFields = async () => {
  productStore.clearSelectedProduct()
}
</script>

<style lang="scss">
.product-page-main-controller {
  display: flex;
  .navigation-panel-product-container {
    width: 15%;
  }

  .product-form-container-header {
    margin-bottom: 10px;
  }

  .product-data-table-section {
    padding: 0 5rem;
  }

  .product-form-container {
    .product-header {
      font-weight: 700;
    }
    .p-inputtext,
    .p-password {
      width: 100%;
      height: 2.5rem;
    }
    .p-button {
      width: 100%;
    }

    .product-form-container {
      background: white;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 1fr;
      color: #151717;
    }
    .product-product-form-container-left-side {
      object-fit: cover;
    }
  }
}
</style>
