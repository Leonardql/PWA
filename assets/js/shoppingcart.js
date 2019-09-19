

let orders = localforage.createInstance({ name: "orders" });
let store = localforage.createInstance({ name: "token" });
let activeToken = ''

new Vue({
    el: '#apps',
    data: {
        orders: [],
        subTotal: [],
        submitOrder: {
            ticket1: '',
            ticket2: '',
            ticket3: '',
            totalOrder: 0,
            firstName: '',
            lastName: '',
            company: '',
            address: '',
            apartment: '',
            city: '',
            country: '',
            postal: '',
            phoneNumber: '',
        },
    },
    created() {
        this.loadOrders();
    },
    methods: {
        async loadOrders() {

            this.orders = await orders.getItem("orders");

            this.subTotal = await orders.getItem("totalOrder");

            activeToken = await store.getItem("token")

        },

        sendOrder(e) {
            e.preventDefault();
            let orderData = new FormData()
            orderData.append('ticket_id_1', this.orders[0].ticket_id)
            orderData.append('ticket_id_2', this.orders[1].ticket_id)
            orderData.append('ticket_id_3', this.orders[2].ticket_id)
            orderData.append('ticket_id_1_quantity', parseInt(this.orders[0].quantity,10))
            orderData.append('ticket_id_2_quantity', parseInt(this.orders[1].quantity,10))
            orderData.append('ticket_id_3_quantity', parseInt(this.orders[2].quantity,10))
            orderData.append('totalOrder', this.subTotal[0].totalOrder)
            orderData.append('firstName', this.submitOrder.firstName)
            orderData.append('lastName', this.submitOrder.lastName)
            orderData.append('company', this.submitOrder.company)
            orderData.append('address', this.submitOrder.address)
            orderData.append('apartment', this.submitOrder.apartment)
            orderData.append('city', this.submitOrder.city)
            orderData.append('country', this.submitOrder.country)
            orderData.append('postal', this.submitOrder.postal)
            orderData.append('phoneNumber', this.submitOrder.phoneNumber)

            fetch('https://api.qoli.be/public/api/checkout', {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + activeToken
                }),
                body: orderData
            })
                .then(response => {
                    if (response.status !== 201)
                        throw new Error(response.status + ': ' + response.statusText)

                    alert("Order has been send. ")
                    return window.location.href = 'index.html'
                })

        },

    }

})
