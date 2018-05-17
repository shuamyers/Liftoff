<template>
    <div class="sidebar">
        <p class="text-xs-left headline mt-3"> Filter results </p>
        <div>
            <p class="headlinefont text-xs-left  filter-title"> CATEGORY </p>
            <ul class="clean-list text-xs-left filter">
                <CategoryFilterItem v-for="category in categories" :key="category" :category="category"
                         :isActive="activeCategory === category" @click.native="clickFilterHandler(category)" />
            </ul>
            <v-divider></v-divider>
        </div>
        <div>
            <p class="headlinefont text-xs-left  filter-title">PROJECT TIMING</p>
            <ul class="clean-list text-xs-left filter">
                <li>All </li>
                <li>Launching soon</li>
                <li>Just launched</li>
                <li>Ending soon</li>
            </ul>
            <v-divider></v-divider>
        </div>
    </div>
</template>

<script>
import CategoryFilterItem from './CategoryFilterItem';
export default {
	data() {
		return {
			activeCategory: '',
			categories: ['All','Tech', 'Art','Music','Animals']
		};
	},

	methods: {
		clickFilterHandler(category) {
			this.activeCategory = category;
			this.emitfilter(category);
		},
		emitfilter(category) {
			console.log('hi', category);
			this.active = category;
			if (category === 'All') this.$emit('filterCategory', '');
			else this.$emit('filterCategory', category);
		}
	},
	components: { CategoryFilterItem }
};
</script>

<style scoped>
.sidebar {
	display: inline;
}
.sidebar ul {
	width: 180px;
}
.filter li {
	margin: 20px 0;
	font-size: 20px;
}
.filter li:hover {
	color: #2196f3;
	cursor: pointer;
}
.filter-title {
	margin-top: 35px;
	color: #b5b5b5;
	font-weight: bold;
}

.clean-list {
	list-style: none;
}
</style>
