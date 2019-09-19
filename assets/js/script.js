let store = localforage.createInstance({ name: "token" });
let orders = localforage.createInstance({ name: "orders" })
let eventInfo = localforage.createInstance({ name: "events"})
let subTotal = 0;
let activeToken = null
let event_id = 0
new Vue({
    el: '#app',
    data: {
        seen: false,
        showModal: false, 
        selected: "selected",
        eventcount: '',
        events: [],
        guests: [],
        artists: [],
        testimonials: [],
        tickets: [],
        counter:[],
        user: {
            id: '',
            name: '',
            email: '',
            password: '',
            token: null
        },
        invintation: {
            guestName: '',
            guestNumber: '',
            guestEmail: '',
            guestMessage: ''
        },
        testimonial: {
            comment: ''
        },
        products: [
            {
                name: "",
                price: 0,
                quantity: 0
            },
            {
                name: "",
                price: 0,
                quantity: 0
            },
            {
                name: "",
                price: 0,
                quantity: 0
            },
        ],
        fetchUrl: 'https://api.qoli.be/public/api/events/',
        guestUrl: 'https://api.qoli.be/public/api/guests/',
        artistUrl: 'https://api.qoli.be/public/api/artists/',
        testimonialsUrl: 'https://api.qoli.be/public/api/testimonials/',
        ticketsUrl: 'https://api.qoli.be/public/api/tickets/',

        loading: false,
        error: false
    },
    computed: {
        itemCount: function () {
            var count = 0;

            for (var i = 0; i < this.products.length; i++) {
                count += parseInt(this.products[i].quantity) || 0;
            }

            return count;
        },
        subTotal: function () {
            subTotal = 0;

            for (var i = 0; i < this.products.length; i++) {
                subTotal += this.products[i].quantity * this.tickets[i].price;

            }

            return subTotal;
        },
    },
    async created() {

        this.loading = true;
        eventInfo.setItem("event_id", "1")
        await this.isLoggedIn()
        await this.clearLocalForage();
        await this.loadevents(this.fetchUrl, 1)
        await this.loadGuests(this.guestUrl, 1)
        await this.loadArtists(this.artistUrl, 1)
        await this.loadTestimonials(this.testimonialsUrl, 1)
        await this.loadTickets(this.ticketsUrl, 1)

        await eventInfo.getItem("event_id").then(function(value){
            event_id = value 
        })
        
        



    },
    methods: {
        loadevents(url, eventID) {
            this.error = false
            fetch(url + eventID, {
                headers: new Headers({
                    Authorization: 'Bearer ' + this.user.token
                })
            })
                .then(response => {
                    if (response.status !== 200)
                        throw new Error(response.status + ':' + response.statusText);
                    this.loading = true;

                    return response.json();
                })
                .then(myJson => {
                    this.loading = false;
                    this.events = myJson[0].data
                    this.counter = myJson.counter
            

                })

                .catch(
                    error => this.error = error
                );
        },
        changeItem: async function changeItem(event) {
            let selected = event.target.value
            eventInfo.setItem("event_id", selected)
            await this.loadevents(this.fetchUrl, selected)
            await this.loadGuests(this.guestUrl, selected)
            await this.loadArtists(this.artistUrl, selected)
            await this.loadTestimonials(this.testimonialsUrl, selected)
            await this.loadTickets(this.ticketsUrl, selected)
        },

        loadGuests(url, eventID) {
            this.error = false
            fetch(url + eventID, {

            })
                .then(response => {
                    if (response.status !== 200)
                        throw new Error(response.status + ':' + response.statusText);
                    this.loading = true;

                    return response.json();
                })
                .then(myJson => {
                    this.loading = false;
                    this.guests = myJson.data



                })

                .catch(
                    error => this.error = error
                );
        },
        loadArtists(url, eventID) {
            this.error = false
            fetch(url + eventID, {

            })
                .then(response => {
                    if (response.status !== 200)
                        throw new Error(response.status + ':' + response.statusText);
                    this.loading = true;

                    return response.json();
                })
                .then(myJson => {
                    this.loading = false;
                    this.artists = myJson.data
                })
                .catch(
                    error => this.error = error
                );
        },

        loadTestimonials(url, eventID) {
            this.error = false
            fetch(url + eventID, {

            })
                .then(response => {
                    if (response.status !== 200)
                        throw new Error(response.status + ':' + response.statusText);
                    this.loading = true;

                    return response.json();
                })
                .then(myJson => {
                    this.loading = false;
                    this.testimonials = myJson.data
                })
                .catch(
                    error => this.error = error
                );
        },
        loadTickets(url, eventID) {
            this.error = false
            fetch(url + eventID, {
                headers: new Headers({
                })
            })
                .then(response => {
                    if (response.status !== 200)
                        throw new Error(response.status + ':' + response.statusText);
                    this.loading = true;

                    return response.json();
                })
                .then(myJson => {
                    this.loading = false;
                    this.tickets = myJson.data
                })
                .catch(
                    error => this.error = error
                );
        },
        sendInvintation() {
            let invintationData = new FormData()
            invintationData.append('guestName', this.invintation.guestName)
            invintationData.append('guestNumber', this.invintation.guestNumber)
            invintationData.append('guestEmail', this.invintation.guestEmail)
            invintationData.append('guestMessage', this.invintation.guestMessage)

            fetch('https://api.qoli.be/public/api/invintation', {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + activeToken
                }),
                body: invintationData,
            })
                .then(response => {
                    if (response.status !== 201)
                        throw new Error(response.status + ': ' + response.statusText)

                        alert("Comment hase been send. ")
                        return window.location.href = 'index.html'
                })

        },
        sendTestimonial() {

            eventInfo.getItem("event_id").then(function(value){
                event_id = value 
            })
          
            store.getItem("token").then(function (value) {
                activeToken = value
            })

            let testimonialData = new FormData()
            testimonialData.append('event_id', event_id)
            testimonialData.append('comment', this.testimonial.comment)

            fetch('https://api.qoli.be/public/api/sendtestimonial', {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + activeToken
                }),
                body: testimonialData,
            })
                .then(response => {
                    if (response.status !== 201)
                        throw new Error(response.status + ': ' + response.statusText)

                    alert("Comment hase been send. ")
                    return window.location.href = 'index.html'
                })

        },
        async checkOut() {
            let order = [{ ticket_id: this.tickets[0].ticket_id, productName: this.tickets[0].title, price: this.tickets[0].price, quantity: this.products[0].quantity },
            { ticket_id: this.tickets[1].ticket_id, productName: this.tickets[1].title, price: this.tickets[1].price, quantity: this.products[1].quantity },
            { ticket_id: this.tickets[2].ticket_id, productName: this.tickets[2].title, price: this.tickets[2].price, quantity: this.products[2].quantity }];
            let totalOrder = [{ totalOrder: subTotal }]

            await orders.setItem("orders", order)
            await orders.setItem("totalOrder", totalOrder)
            
            window.location.href = 'shoppingcart.html'

        },
        clearLocalForage() {
            orders.clear()

        },   
        register(e) {
            e.preventDefault();
            this.error = false
            let userData = new FormData()
            userData.append('name', this.user.name)
            userData.append('email', this.user.email)
            userData.append('password', this.user.password)

            fetch('https://api.qoli.be/public/api/register', {
                method: 'POST',
                body: userData
            })
                .then(response => {

                    if (response.status !== 200)
                    throw new Error("One of the fields were not filled in.")


                    return response.json();
                })
                .then(myJson => {


                    this.user.password = ''
                    this.user.token = myJson.access_token
                    store.setItem("token", this.user.token)
                    window.location.href = 'index.html'



                    window.location.href = 'index.html'

                })

                .catch(


                    error => this.error = error
                );
        },
        login() {
            this.error = false
            let formData = new FormData()
            formData.append('email', this.user.email)
            formData.append('password', this.user.password)


            fetch('https://api.qoli.be/public/api/login', {
                method: 'POST',
                body: formData
            })
                .then(response => {

                    if (response.status !== 200)
                        throw new Error("The email or password is incorrect.")


                    return response.json();
                })
                .then(myJson => {

                    this.user.token = myJson.access_token
                    store.setItem("token", this.user.token)
                    window.location.href = 'index.html'

                })

                .catch(

                    error => this.error = error
                );
        },

        isLoggedIn() {
            store.getItem("token").then(function (value) {
                activeToken = value
            })

            if (activeToken !== null) {
                return true
            }
        },
        logout() {
            store.clear("token");
        },

        updateQuantity: function (index, event) {
            var value = event.target.value;
            var product = this.products[index];

            if (value === "" || (parseInt(value) >= 0 && parseInt(value) < 10)) {
                product.quantity = value;
            }

            this.$set(this.products, index, product);
        },


    },

});