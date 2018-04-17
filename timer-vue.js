Vue.component('custom-clock', {
    template: `
        <div>
            <canvas v-bind:height="height" v-bind:width="width"></canvas>
            <div class="config">
                <div class="clock-creation">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name">
                    <label for="duration">Durée</label>
                    <input type="range" id="duration" name="duration" min="1" max="60">
                    <button id="creator">Create Clock</button>
                </div>
                <div class="limit-settings">
                    <li v-for="item in items">
                        {{ item.message }}
                    </li>
                </div>
            </div>
        </div>
    `,
    data: () => {
        return {
            height:500,
            width:500,
            items: [
                { message: 'Foo' },
                { message: 'Bar' }
            ]
        }
    },
    methods: {

    }
})