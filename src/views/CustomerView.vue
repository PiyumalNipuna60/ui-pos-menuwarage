<template>
  <div class="customer-page-main-controller">
    <section class="navigation-panel-customer-container">
      <NavigationPanel />
    </section>
    <div class="customer-form-container main-area-container">
      <div class="customer-form-container-header"><h2>USER LOGIN</h2></div>
      <div class="customer-form-container-body mt-5">
        <div>
          <section class="formgrid grid justify-content-center">
            <section class="username-field-container field col-12 md:col-4 mr-5 mb-5">
              <FloatLabel variant="on">
                <InputText id="username" v-model="customerList.selectedCustomer.name" />
                <label for="username">Enter customer name</label>
              </FloatLabel>
            </section>
            <section class="username-field-container field col-12 md:col-4 mb-5">
              <FloatLabel variant="on">
                <InputText id="username" v-model="customerList.selectedCustomer.contact" />
                <label for="username">Enter customer mobile number</label>
              </FloatLabel>
            </section>

            <section class="username-field-container field col-12 md:col-4 mr-5 mb-5">
              <FloatLabel variant="on">
                <InputText id="username" v-model="customerList.selectedCustomer.nic" />
                <label for="username">Enter customer NIC number</label>
              </FloatLabel>
            </section>
            <section class="username-field-container field col-12 md:col-4 mb-5">
              <FloatLabel variant="on">
                <InputText id="username" v-model="customerList.selectedCustomer.address" />
                <label for="username">Enter customer address</label>
              </FloatLabel>
            </section>
          </section>
          <section class="formgrid grid justify-content-center mt-3">
            <div class="field col-12 md:col-2 mr-5">
              <Button
                :label="customerList.selectedCustomer.id ? 'UPDATE CUSTOMER' : 'SAVE CUSTOMER'"
                icon="pi pi-save"
                iconPos="right"
                @click="saveCustomer"
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
        <section class="customer-data-table-section mt-5">
          <DataTable
            v-model:selection="customer"
            :value="customers"
            paginator
            dataKey="id"
            selectionMode="single"
            :metaKeySelection="false"
            :rows="5"
            @rowSelect="onRowSelect"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
          >
            <Column field="name" header="Name" style="width: 20%"></Column>
            <Column field="nic" header="NIC" style="width: 25%"></Column>
            <Column field="contact" header="Mobile" style="width: 20%"></Column>
            <Column field="address" header="Address" style="width: 25%"></Column>
            <Column field="action" header="Action" style="width: 10%">
              <template #body="slotProps">
                <Button
                  label="Remove"
                  icon="pi pi-times"
                  iconPos="right"
                  @click="removeCustomer(slotProps)"
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
import { useCustomerStore } from '@/stores/customerStore'
import { onMounted, ref } from 'vue'
import NavigationPanel from '../components/NavigationPanel.vue'

const customerStore = useCustomerStore()
const { customerList } = useCustomerStore()

const customer = ref(null)
const customers = ref([])

onMounted(async () => {
  await loadCustomerData()
  console.log('customers list________', customerList)
})

const loadCustomerData = async () => {
  try {
    await customerStore.loadCustomers()
    customers.value = customerList.data
  } catch (error) {
    console.error('Customer data load failed', error)
  }
}

const onRowSelect = () => {
  customerList.selectedCustomer = customer.value
  console.log('customers list________', customerList.selectedCustomer)
}

const saveCustomer = async () => {
  try {
    customerList.selectedCustomer.id
      ? customerStore.updateCustomerDetails()
      : customerStore.saveCustomer()
  } catch (error) {
    console.error('Customer data load failed', error)
  }
}

const removeCustomer = async (params) => {
  customerStore.removeCustomer(params.data.id)
}

const clearInputFields = async () => {
  customerStore.clearSelectedCustomer()
}
</script>

<style lang="scss">
.customer-page-main-controller {
  display: flex;
  .navigation-panel-customer-container {
    width: 15%;
  }

  .customer-form-container-header {
    margin-bottom: 10px;
  }

  .customer-data-table-section {
    padding: 0 5rem;
  }

  .customer-form-container {
    .customer-header {
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

    .customer-form-container {
      background: white;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 1fr;
      color: #151717;
    }
    .customer-customer-form-container-left-side {
      object-fit: cover;
    }
  }
}
</style>
