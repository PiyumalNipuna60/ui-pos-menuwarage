<template>
  <div class="stock-details-container">
    <div>
      <section class="stock-details-container__main-container">
        <section class="input-field-container">
          <FloatLabel variant="on">
            <InputText id="stockInvoice" v-model="invoiceNumber" />
            <label for="stock">Enter stock invoice</label>
          </FloatLabel>
        </section>
        <section class="input-field-container">
          <FloatLabel variant="on">
            <DatePicker v-model="createdAt" inputId="date" showIcon iconDisplay="input" />
            <label for="date">Date</label>
          </FloatLabel>
        </section>
        <div class="button-field-container">
          <Button label="Add Product" icon="pi pi-plus" @click="toggleDialog"></Button>
        </div>
        <section class="product-adding-dialog-container">
          <Dialog
            v-model:visible="visible"
            :model="true"
            pt:root:class="!border-0 !bg-transparent"
            pt:mask:class="backdrop-blur-sm"
            class="flex flex-col gap-6 rounded-2xl product-adding-dialog w-4"
          >
            <template #header>
              <section class="input-field-container w-8">
                <FloatLabel variant="on">
                  <Dropdown
                    v-model="selectedProduct"
                    :options="productList"
                    optionLabel="name"
                    filter
                    showClear
                    class="w-full"
                    @change="setSelectedProduct"
                  >
                    <template #option="slotProps">
                      <div v-if="slotProps.option" class="flex align-items-center">
                        <div>{{ slotProps.option.id }} &nbsp; - &nbsp;</div>

                        <div>{{ slotProps.option.name }}</div>
                      </div>
                      <span v-else>
                        {{ slotProps.placeholder }}
                      </span>
                    </template>
                  </Dropdown>
                  <label for="stock">Search product by id or name</label>
                </FloatLabel>
              </section>
            </template>

            <section class="input-section-container">
              <section class="input-section-sub-container grid">
                <!-- <section class="input-field-container col">
                  <FloatLabel variant="on">
                    <InputNumber
                      id="productId"
                      disabled
                      v-model="product"
                      @blur="calculateTotal"
                    />
                    <label for="stock">Product id</label>
                  </FloatLabel>
                </section> -->
                <section class="input-field-container col">
                  <FloatLabel variant="on">
                    <InputText id="name" disabled v-model="name" @blur="calculateTotal" />
                    <label for="stock">Product name</label>
                  </FloatLabel>
                </section>
              </section>
              <section class="input-section-sub-container grid">
                <section class="input-field-container col">
                  <FloatLabel variant="on">
                    <InputNumber id="quantity" v-model="quantity" @blur="calculateTotal" />
                    <label for="stock">Enter product quantity</label>
                  </FloatLabel>
                </section>
                <section class="input-field-container col">
                  <FloatLabel variant="on">
                    <InputText id="unitPrice" v-model="unitPrice" @blur="calculateTotal" />
                    <label for="stock">Enter product unit prize</label>
                  </FloatLabel>
                </section>
              </section>
              <section class="input-section-sub-container grid">
                <section class="input-field-container col">
                  <FloatLabel variant="on">
                    <InputNumber id="freeItems" v-model="freeItems" />
                    <label for="stock">Enter product free items</label>
                  </FloatLabel>
                </section>
                <section class="input-field-container col">
                  <FloatLabel variant="on">
                    <InputText id="totalPrice" v-model="total" disabled />
                    <label for="stock">Product total</label>
                  </FloatLabel>
                </section>
              </section>
            </section>
            <template #footer>
              <section class="dialog-box-footer">
                <div>
                  <Button
                    label="ADD TO TABLE"
                    icon="pi pi-save"
                    iconPos="right"
                    @click="addProductToTable"
                  ></Button>
                </div>
                <div>
                  <Button
                    label="CLEAR"
                    icon="pi pi-times"
                    iconPos="right"
                    @click="clearInputFields"
                  ></Button>
                </div>
              </section>
              <!-- <Button
                label="Save"
                outlined
                severity="secondary"
                @click="visible = false"
                autofocus
              /> -->
            </template>
          </Dialog>
        </section>
      </section>
    </div>

    <Divider />

    <section class="stock-data-table-section mt-5">
      <DataTable
        v-model:selection="selectedProduct"
        :value="stockProductList"
        paginator
        dataKey="productId"
        selectionMode="single"
        :metaKeySelection="false"
        :rows="5"
        @rowSelect="onRowSelect"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
      >
        <Column field="name" header="Product Name" style="width: 20%"></Column>
        <Column field="initialQuantity" header="Quantity" style="width: 25%"></Column>
        <Column field="unitPrice" header="Unit Price" style="width: 25%"></Column>
        <Column field="total" header="Total" style="width: 20%"></Column>
        <Column field="freeItems" header="Free Items" style="width: 20%"></Column>
        <Column field="action" header="Action" style="width: 10%">
          <template #body="slotProps">
            <Button
              label="Remove"
              icon="pi pi-times"
              iconPos="right"
              @click="removeProductFromList(slotProps)"
            ></Button>
          </template>
        </Column>
        <ColumnGroup type="footer">
          <Row>
            <Column footer="Totals:" :colspan="5" footerStyle="text-align:right" />
            <Column :footer="subTotal" />
          </Row>
        </ColumnGroup>
      </DataTable>
      <section class="flex justify-content-end">
        <div>
          <Button
            :label="getSelectedStock?.stockId ? 'UPDATE STOCK' : 'SAVE STOCK'"
            icon="pi pi-save"
            iconPos="right"
            @click="saveStock"
          ></Button>
        </div>
        <div>
          <Button
            label="CLEAR TABLE"
            icon="pi pi-times"
            iconPos="right"
            @click="clearStockProductList"
          ></Button>
        </div>
      </section>
    </section>
  </div>
</template>
<script setup>
import { useProductStore } from '@/stores/productStore'
import { useStockStore } from '@/stores/stockStore'
import { pullAt } from 'lodash'
import { computed, onMounted, ref } from 'vue'

const stockStore = useStockStore()
const { getSelectedStock } = useStockStore()
const { getProductList } = useProductStore()

const visible = ref(false)
const quantity = ref(null)
const productId = ref(null)
const name = ref(null)
const total = ref(null)
const freeItems = ref(null)
const unitPrice = ref(null)
const selectedProduct = ref()
const productList = ref(getProductList)
const invoiceNumber = ref(getSelectedStock.invoiceNumber ?? null)
const createdAt = ref(getSelectedStock.createdAt ?? null)
const stockProductList = ref(getSelectedStock.products ?? [])

onMounted(async () => {
  console.log('product list <<')
})

const addProductToTable = () => {
  stockProductList.value.push({
    productId,
    name,
    freeItems,
    total,
    unitPrice,
    status: 'active',
    initialQuantity: quantity,
    availableQuantity: quantity,
  })
  clearInputFields()
  toggleDialog()
}

const onRowSelect = () => {
  console.log('selected products___________', selectedProduct.value)
}

const saveStock = async () => {
  try {
    getSelectedStock.invoiceNumber ? stockStore.updateStockDetails() : stockStore.saveStock()
  } catch (error) {
    console.error('Stock data load failed', error)
  }
}

const removeProductFromList = async (params) => {
  pullAt(stockProductList.value, params.index)
}

const toggleDialog = async () => {
  visible.value = !visible.value
}

const setSelectedProduct = () => {
  productId.value = selectedProduct.value ? selectedProduct.value.productId : null
  name.value = selectedProduct.value ? selectedProduct.value.name : null
}

const calculateTotal = () => {
  if (quantity.value && unitPrice.value) {
    total.value = quantity.value * unitPrice.value
  }
}

const subTotal = computed(() => {
  let total = 0
  for (let sale of stockProductList.value) {
    total += sale.total
  }
  return total
})

// const setInitialProduct = async () => {
//   return {
//     id: null,
//     productId: null,
//     name: null,
//     unitPrice: null,
//     initialQty: null,
//     availableQty: null,
//     freeItems: null,
//     total: null,
//     demarcation: null,
//     sataus: 'active',
//   }
// }

const clearStockProductList = async () => {
  stockProductList.value = []
}
const clearInputFields = async () => {
  productId.value = null
  name.value = null
  quantity.value = null
  unitPrice.value = null
  freeItems.value = null
  total.value = null
  name.value = null
  selectedProduct.value = null
}
</script>

<style lang="scss">
.stock-details-container {
  .stock-details-container__main-container {
    .input-field-container,
    .button-field-container {
      padding: 0;
      margin-bottom: 0.5rem;
      width: 16.6667%;

      .p-button {
        width: -webkit-fill-available;
        margin: 5px;
      }
    }
  }

  .p-datatable {
    height: 50vh;
  }
}
.product-adding-dialog {
  background-image: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700));
  gap: 1rem !important;

  .input-section-container {
  }

  .input-section-sub-container {
    display: flex;
  }
  .dialog-box-footer {
    display: flex;
  }
}
</style>
