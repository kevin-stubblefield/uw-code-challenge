<template>
    <b-container>
        <div class="repositories">
            <div class="avatar" v-for="(userInfo, username) in sortedRepositories" :key="username">
                <img :id="`${username}-popover`" :src="userInfo.avatarUrl" :alt="username">
            </div>
        </div>
    </b-container>
</template>

<script>
import axios from 'axios';

const SERVER_PORT = 3000;

export default {
    name: 'repositories',
    data() {
        return {
            repositories: []
        }
    },
    mounted() {
        this.getRepositories();
    },
    methods: {
        async getRepositories() {
            let response = await axios.get(`http://localhost:${SERVER_PORT}/repositories`);
            this.repositories = response.data;
        }
    },
    computed: {
        sortedRepositories() {
            let sorted = {};
            Object.keys(this.repositories).sort((a, b) => {
                if (a.toLowerCase() < b.toLowerCase()) return -1;
                if (a.toLowerCase() > b.toLowerCase()) return 1;
                return 0;
            }).forEach(key => {
                sorted[key] = this.repositories[key];
            });
            return sorted;
        }
    }
}
</script>

<style scoped>
    .repositories {
        display: flex;
        flex-wrap: wrap;
    }

    .avatar img {
        width: 96px;
    }
</style>
