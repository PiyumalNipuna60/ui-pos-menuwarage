<template>
  <div class="stock-page-main-controller">
    <section class="navigation-panel-stock-container">
      <NavigationPanel />
    </section>
    <div class="stock-form-container main-area-container">
      <div class="stock-form-container-header">
        <h2>STOCK MANAGE</h2>
        <section class="flex w-5 justify-content-end">
          <FloatLabel variant="on" class="col-9">
            <Dropdown
              v-model="selectedStock"
              :options="stocks"
              optionLabel="stockId"
              filter
              showClear
              class="w-full"
              @change="setSelectedStock"
            >
              <template #option="slotProps">
                <div v-if="slotProps.option" class="flex align-items-center">
                  <div>{{ slotProps.option.stockId }} &nbsp; - &nbsp;</div>

                  <div>{{ slotProps.option.createdAt }} &nbsp; - &nbsp;</div>
                  <div>Rs &nbsp;{{ slotProps.option.subTotal }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
            <label for="stock">Search by stock id or date</label>
          </FloatLabel>

          <div v-if="!selectedStock" class="col-3">
            <Button label="New" icon="pi pi-plus" iconPos="right" @click="addNewStock"></Button>
          </div>
        </section>
      </div>
      <div v-if="selectedStock" class="stock-form-container-body mt-5">
        <div>
          <section class="grid justify-content-center">
            <section class="username-field-container field col-6 md:col-4">
              <FloatLabel variant="on">
                <Dropdown
                  v-model="selectedProduct"
                  :options="productList.data"
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
            <section class="username-field-container field col-6 md:col-4">
              <FloatLabel variant="on">
                <InputText id="stock" v-model="productName" disabled />
                <label for="stock">Selected product</label>
              </FloatLabel>
            </section>
          </section>
          <section class="grid justify-content-center">
            <section class="username-field-container field col-2">
              <FloatLabel variant="on">
                <InputNumber
                  id="stock"
                  v-model="stockList.selectedProduct.quantity"
                  @blur="calculateTotal"
                />
                <label for="stock">Enter product quantity</label>
              </FloatLabel>
            </section>
            <section class="username-field-container field col-2">
              <FloatLabel variant="on">
                <InputText
                  id="stock"
                  v-model="stockList.selectedProduct.unitPrice"
                  @blur="calculateTotal"
                />
                <label for="stock">Enter product unit prize</label>
              </FloatLabel>
            </section>
            <section class="username-field-container field col-2">
              <FloatLabel variant="on">
                <InputText id="stock" v-model="stockList.selectedProduct.total" disabled />
                <label for="stock">Product total</label>
              </FloatLabel>
            </section>
            <section class="username-field-container field col-2">
              <FloatLabel variant="on">
                <InputNumber id="stock" v-model="stockList.selectedProduct.freeItems" />
                <label for="stock">Enter product free items</label>
              </FloatLabel>
            </section>
          </section>
          <section class="formgrid grid justify-content-center mt-3">
            <div class="field col-12 md:col-2 mr-5">
              <Button
                :label="stockList.selectedStock?.id ? 'UPDATE STOCK' : 'SAVE STOCK'"
                icon="pi pi-save"
                iconPos="right"
                @click="saveStock"
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
        <section class="stock-data-table-section mt-5">
          <DataTable
            v-model:selection="stockList.selectedProduct"
            :value="stockList.selectedStock.products"
            paginator
            dataKey="productId"
            selectionMode="single"
            :metaKeySelection="false"
            :rows="5"
            @rowSelect="onRowSelect"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
          >
            <Column field="productId" header="Product ID" style="width: 20%"></Column>
            <Column field="quantity" header="Quantity" style="width: 25%"></Column>
            <Column field="total" header="Total" style="width: 20%"></Column>
            <Column field="freeItems" header="Free Items" style="width: 20%"></Column>
            <Column field="createdAt" header="Created Date" style="width: 25%"></Column>
            <Column field="action" header="Action" style="width: 10%">
              <template #body="slotProps">
                <Button
                  label="Remove"
                  icon="pi pi-times"
                  iconPos="right"
                  @click="removeStock(slotProps)"
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
            <div class="field col-12 md:col-2 mr-5">
              <Button
                :label="stockList.selectedStock?.id ? 'UPDATE STOCK' : 'SAVE STOCK'"
                icon="pi pi-save"
                iconPos="right"
                @click="saveStock"
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
        </section>
      </div>
      <div v-else class="stock-form-container-no-data">
        <img src="../assets/images/search-for.png" alt="search for stock data" />
        <p>Search above to display stock data.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore'
import { useStockStore } from '@/stores/stockStore'
import { computed, onMounted, ref } from 'vue'
import NavigationPanel from '../components/NavigationPanel.vue'

const stockStore = useStockStore()
const { stockList, getInitialStock, resetSelectedProduct } = useStockStore()
const { productList, getInitialProduct, loadProducts } = useProductStore()

const stock = ref(null)
const stocks = ref([])
const products = ref(null)
const productName = ref(null)
const selectedStock = ref(null)
const selectedProduct = ref(null)

onMounted(async () => {
  await loadStocksData()
  await loadProducts()
  console.log('stocks list________', productList)
})

const loadStocksData = async () => {
  try {
    await stockStore.loadStocks()
    stocks.value = stockList.data
  } catch (error) {
    console.error('Stock data load failed', error)
  }
}

const subTotal = computed(() => {
  let total = 0
  console.log('sub total cal _________', stockList.selectedStock.products)

  for (let sale of stockList.selectedStock.products) {
    total += sale.total
  }
  return total
})

const calculateTotal = () => {
  if (stockList?.selectedProduct?.quantity && stockList?.selectedProduct?.unitPrice) {
    stockList.selectedProduct.total =
      stockList?.selectedProduct?.quantity * stockList?.selectedProduct?.unitPrice
  }
}

const addNewStock = () => {
  selectedStock.value = getInitialStock
  // console.log('selected stocks ________', selectedStock.value)
}

const onRowSelect = () => {
  console.log('selected products___________', stockList.selectedProduct)
}

const setSelectedProduct = () => {
  // console.log('stocks list_sss_______', selectedProduct.value)
  productName.value = selectedProduct.value ? selectedProduct.value.name : ''
  resetSelectedProduct()
}

const setSelectedStock = () => {
  productName.value = selectedProduct.value ? selectedProduct.value.name : ''
  stockList.selectedStock = selectedStock.value
  console.log('stocks list_sss_______', stockList)
}

const saveStock = async () => {
  try {
    stockList.selectedStock.id ? stockStore.updateStockDetails() : stockStore.saveStock()
  } catch (error) {
    console.error('Stock data load failed', error)
  }
}

const removeStock = async (params) => {
  stockStore.removeStock(params.data.id)
}

const clearInputFields = async () => {
  resetSelectedProduct()
  productName.value = ''
  selectedProduct.value = null
}
</script>

<style lang="scss">
.stock-page-main-controller {
  display: flex;
  .navigation-panel-stock-container {
    width: 15%;
  }

  .stock-form-container-header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .stock-data-table-section {
    padding: 0 5rem;
  }

  .stock-form-container {
    .stock-form-container-no-data {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .stock-header {
      font-weight: 700;
    }
    .p-inputtext,
    .p-password,
    .p-inputnumber {
      width: 100%;
      height: 2.5rem;
    }
    .p-button {
      width: 100%;
    }

    .stock-form-container {
      background: white;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 1fr;
      color: #151717;
    }
    .stock-stock-form-container-left-side {
      object-fit: cover;
    }
  }
}
</style>
