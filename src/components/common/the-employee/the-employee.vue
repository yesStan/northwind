<template>
    <div
        :at-the-employee="atAttribute"
        class="the-employee"
    >
        <div class="table-wrapper">
            <table class="customTable">
                <thead>
                    <tr>
                        <th>
                            <TheIcon
                                class="single-color"
                                icon="ballot"
                            />Employee information
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <td class="product-block">
                        <div class="product-info">
                            <div class="title">
                                <h2 class="bold">Name</h2>
                                <p>{{ employee.firstName + ' ' + employee.lastName }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Title</h2>
                                <p>{{ employee.title }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Title Of Courtesy</h2>
                                <p>{{ employee.titleOfCourtesy }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Birth Date</h2>
                                <p>{{ employee.birthDate }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Hire Date</h2>
                                <p>{{ employee.hireDate }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Address</h2>
                                <p>{{ employee.address }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">City</h2>
                                <p>{{ employee.city }}</p>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="title">
                                <h2 class="bold">Postal Code</h2>
                                <p>{{ employee.postalCode }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Country</h2>
                                <p>{{ employee.country }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Home Phone</h2>
                                <p>{{ employee.homePhone }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Extension</h2>
                                <p>{{ employee.extension }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Notes</h2>
                                <p>{{ employee.notes }}</p>
                            </div>
                            <div
                                class="title"
                                v-if="employee.reportsTo"
                            >
                                <h2 class="bold">Reports To</h2>
                                <router-link
                                    :to="{ name: ROUTE_NAMES.EMPLOYEE_PROFILE, params: { id: employee.reportsTo } }"
                                >
                                    {{ reportedPerson }}
                                </router-link>
                            </div>
                        </div>
                    </td>
                    <tr>
                        <TheBbuton />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import { getEmployeeData, IEmployee, IReport } from '../../../api/interfaces';
import TheBbuton from '../the-bbuton';
import TheIcon from '../the-icon';
import { RouterLink } from 'vue-router';
import { prepareQueryInfoCommitPayload } from '../../../services/store-helper-service';

export default defineComponent({
    name: 'TheEmployee',
    components: {
        TheBbuton, TheIcon
    },
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            employee: {
                employeeID: 0,
                lastName: '',
                firstName: '',
                title: '',
                titleOfCourtesy: '',
                birthDate: '',
                hireDate: '',
                address: '',
                city: '',
                region: '',
                postalCode: '',
                country: '',
                homePhone: '',
                extension: '',
                notes: '',
                reportsTo: 0
            } as IEmployee,

            reportsToTable: {
                employeeID: 0,
                lastName: '',
                firstName: '',
                title: '',
                titleOfCourtesy: '',
                birthDate: '',
                hireDate: '',
                address: '',
                city: '',
                region: '',
                postalCode: '',
                country: '',
                homePhone: '',
                extension: '',
                notes: '',
                reportsTo: null,
            } as IReport,
            reportedPerson: '',

            ROUTE_NAMES
        }
    },
    watch: {
        '$route': function (value) {
            if (value?.params?.id) {

                console.log('changer');
                this.getEmployee();
            }
        }
    },
    created() {
        this.getEmployee()
        // this.$watch(
        //     () => this.$route.params, this.getEmployee);
    },
    computed: {
        employeeId() {
            return Number(this.$route?.params?.id);
        }
    },
    methods: {
        async getEmployee() {
            if (!this.employeeId) {
                return
            }

            try {
                const response = await getEmployeeData(this.employeeId);

                //@ts-ignore
                const [{ employees, reportsToTable }] = response.data;
                this.employee = employees
                this.reportsToTable = reportsToTable
                console.log(reportsToTable.firstName + ' ' + reportsToTable.lastName);

                this.reportedPerson = reportsToTable.firstName + ' ' + reportsToTable.lastName;

                this.$store.commit('addSingleQueryInfo', prepareQueryInfoCommitPayload(response.data.length, response.queryInfo, response.queryInfo.workerId))
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>

<style lang="scss" src="./the-employee.scss" />
