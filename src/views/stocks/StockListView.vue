<template>
  <div class="stock-page-main-controller">
    <section class="navigation-panel-stock-container">
      <NavigationPanel />
    </section>
    <div class="stock-form-container main-area-container">
      <div class="stock-form-container-header">
        <h2>STOCK MANAGE</h2>
        <section class="flex w-2 justify-content-end">
          <div v-if="isStockDetails" class="w-full">
            <Button
              label="GO BACK"
              icon="pi pi-arrow-left"
              iconPos="right"
              class="w-full"
              @click="toggleStockDetails(false)"
            ></Button>
          </div>
          <div v-else class="w-full">
            <Button
              label="New"
              class="w-full"
              icon="pi pi-plus"
              iconPos="right"
              @click="toggleStockDetails(true)"
            ></Button>
          </div>
        </section>
      </div>
      <div v-if="isStockDetails" class="stock-form-container-body mt-3">
        <StockDetailsView></StockDetailsView>
      </div>
      <div v-else class="stock-form-container-stock-table">
        <div class="stock-table-container">
          <DataTable
            v-model:expandedRowGroups="expandedRowGroups"
            :value="mappedStockList"
            expandableRowGroups
            rowGroupMode="subheader"
            groupRowsBy="invoiceNumber"
            sortMode="single"
            sortField="invoiceNumber"
            filterDisplay="row"
            :sortOrder="1"
            paginator
            :rows="10"
            :rowsPerPageOptions="[10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            :globalFilterFields="['name', 'invoiceNumber']"
          >
            <template #header>
              <div class="flex justify-content-end">
                <IconField>
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>
              </div>
            </template>
            <template #groupheader="slotProps">
              <span class="align-middle ml-2 font-bold leading-normal"
                >Invoice id: &nbsp;{{ slotProps.data.invoiceNumber }} &nbsp; - &nbsp; Created date:
                &nbsp; {{ slotProps.data.createdAt }}
              </span>

              <Button
                label="UPDATE STOCK"
                icon="pi pi-plus"
                iconPos="right"
                class="update-stock-details-button"
                @click="updateStockDetails(slotProps.data.stockId)"
              ></Button>
            </template>
            <Column field="invoiceNumber" header="Invoice Number"></Column>
            <Column field="productId" header="ProductId" style="width: 15%"></Column>
            <Column field="name" header="Product name" style="width: 25%"></Column>
            <Column field="quantity" header="Quantity" style="width: 15%"></Column>
            <Column field="unitPrice" header="Unit price" style="width: 15%"></Column>
            <Column field="total" header="Total price" style="width: 15%"></Column>
            <Column field="freeItems" header="Free items" style="width: 15%"></Column>
          </DataTable>
          <!-- <Toast /> -->
        </div>
        <!-- <img src="../assets/images/search-for.png" alt="search for stock data" />
        <p>Search above to display stock data.</p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore'
import { useStockStore } from '@/stores/stockStore'
import { FilterMatchMode } from '@primevue/core/api'
import { onMounted, ref } from 'vue'
import NavigationPanel from '../../components/NavigationPanel.vue'
import StockDetailsView from './StockDetailsView.vue'

const stockStore = useStockStore()
const productStore = useProductStore()
const { loadStocks, resetSelectedStock, setSelectedStock } = useStockStore()
const { loadProducts } = useProductStore()

const isStockDetails = ref(false)
const processing = ref(false)
const mappedStockList = ref([])
const productList = ref(null)
const expandedRowGroups = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  invoiceNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})
onMounted(async () => {
  await loadData()
  // mapProductNameWithStock()
})

const loadData = async () => {
  try {
    processing.value = true
    await Promise.all([loadProducts(), loadStocks()])
    mappedStockList.value = stockStore.getmappedStockList
    productList.value = productStore.getProductList
    processing.value = false
  } catch (error) {
    processing.value = false
    console.error('StockListVIew loadData failed!', error)
  }
}

// const mapProductNameWithStock = async () => {
//   let productMap = keyBy(productList, 'id')
//   //Map through stock log and enrich products with names
//   stockList.value.data = stockList.value.data.map((stock) => {
//     return {
//       ...stock,
//       products: stock.products.map((product) => {
//         return {
//           ...product,
//           name: productMap[product.productId]?.name || 'Unknown Product',
//         }
//       }),
//     }
//   })
// }

const toggleStockDetails = (param) => {
  isStockDetails.value = param
  if (!param) {
    resetSelectedStock()
  }
}

const updateStockDetails = (stockId) => {
  setSelectedStock(stockId)
  toggleStockDetails(true)
}
</script>

<style lang="scss">
.stock-page-main-controller {
  .main-area-container {
    padding: 2rem;
  }

  display: flex;
  .navigation-panel-stock-container {
    width: 15%;
  }

  .stock-form-container-header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .stock-form-container {
    .stock-form-container-stock-table {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .stock-table-container {
      width: 100%;
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
    .update-stock-details-button {
      right: 0;
      position: absolute;
      margin: 0;
      height: 30px;
    }

    td {
      position: relative;
    }

    .p-datatable-table-container {
      max-height: 69vh;
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
