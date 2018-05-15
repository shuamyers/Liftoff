<template>
	<div class="sidebar">
		<p class="text-xs-left headline mt-3"> Filter results </p>
		<div>
			<p class="headlinefont text-xs-left  filter-title"> CATEGORY </p>
			<ul class="clean-list text-xs-left filter">
				<CategoryFilterItem v-for="category in categories" :key="category" :category="category" :isActive="activeCategory === category" @click.native="clickFilterHandler(category)" />
			</ul>
			<v-divider></v-divider>
		</div>
		<div>
			<p class="headlinefont text-xs-left filter-title">PROJECT TIMING</p>
			<ul class="clean-list text-xs-left filter">
				<StatusFilterItem v-for="item in status" :key="item" :status="item" :isActive="activeStatus === item" @click.native="clickStatusFilterHandler(item)" />
			</ul>
			<v-divider></v-divider>
		</div>
	</div>
</template>

<script>
import CategoryFilterItem from './CategoryFilterItem';
import StatusFilterItem from './StatusFilterItem';
export default {
	data() {
		return {
			activeCategory: '',
			categories: ['All', 'Tech', 'Art', 'Music', 'Animals'],
			activeStatus: '',
			status: ['All', 'Just launched', 'Ending soon']
		};
	},

	methods: {
		clickFilterHandler(category) {
			this.activeCategory = category;
			this.emitFilterCategory(category);
		},
		clickStatusFilterHandler(status) {
			this.activeStatus = status;
			console.log('filter', status);
			this.emitFilterStatus(status);
		},
		emitFilterCategory(category) {
			if (category === 'All') this.$emit('filterCategory', '');
			else this.$emit('filterCategory', category);
		},
		emitFilterStatus(status) {
			if (status === 'All') status = '';
			else if (status === 'Just launched') status = '{ "$gt": 20 }';
			else status = '{ "$lt" : 7 }';
			this.$emit('filterStatus', status);

		}
	},
	components: {
		CategoryFilterItem,
		StatusFilterItem
	}
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
