var posts_api_url = "http://localhost:3000/posts";

var vm = new Vue({
    el: "#app",
    data: {
        currentRestaurant: null,
        ajaxing: false,
        newRecord: {
            name: null,
            add: null,
            description: null,
            price: null
        },
        restaurants: [{}]
    },
    mounted: function() {
        this.ajaxing = true
        axios.get(posts_api_url).then((res) => {
            this.ajaxing = false
            console.log(res);
            vm.restaurants = res.data;
        });
    },
    methods: {
        inputValidate: function(restaurant) {
            if (!restaurant.name) {
                alert('name cannot be blank!')
                return false
            }
            if (!restaurant.add) {
                alert('name cannot be blank!')
                return false
            }
            if (!restaurant.description) {
                alert('name cannot be blank!')
                return false
            }
            if (!(restaurant.price > 0)) {
                alert('name cannot be blank!')
                return false
            }
            return true
        },
        increase: function() {
            if (this.ajaxing) return
            this.ajaxing = true
            axios.post('http://localhost:3000/posts', this.newRecord).then((res) => {
                this.ajaxing = false
                vm.restaurants.push(res.data);
                vm.newRecord = {
                    name: '',
                    add: '',
                    description: '',
                    price: ''
                }
            })
        },
        decrease: function(restaurant) {
            if (this.ajaxing) return
            this.ajaxing = true
            axios.delete(`http://localhost:3000/posts/${restaurant.id}`)
                .then((res) => {
                    this.ajaxing = false
                    this.restaurants = this.restaurants.filter(r => r.id != restaurant.id)
                })
        },
        showRestaurant: function(restaurant) {
            if (this.ajaxing) return
            this.ajaxing = true

            axios.get(`http://localhost:3000/posts/${restaurant.id}`)
                .then(res => {
                    this.ajaxing = false
                    this.currentRestaurant = res.data
                    $('#myModal').modal('show')
                })
        },
        modifyRestaurant: function(restaurant) {
            if (this.ajaxing) return
            this.ajaxing = true
            axios.get(`http://localhost:3000/posts/${restaurant.id}`)
                .then(res => {
                    this.ajaxing = false
                    this.currentRestaurant = res.data
                    $('#myModal2').modal('show')
                })
        },
        updateRestaurant: function(restaurant) {
            if (!this.inputValidate(restaurant)) return
            if (this.ajaxing) return
            this.ajaxing = true
            axios.patch(`http://localhost:3000/posts/${restaurant.id}`, restaurant)
                .then(res => {
                    this.ajaxing = false
                    this.restaurants = this.restaurants.map(r => {
                        if (r.id == restaurant.id) return restaurant
                        return r
                    })
                    $('#myModal2').modal('hide')
                    alert('update success')
                })
        }
    }
});
