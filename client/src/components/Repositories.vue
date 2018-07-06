<template>
    <b-container>
        <b-alert :show="showError" variant="danger">{{ errorMessage }}</b-alert>
        <div class="repositories">
            <div class="avatar" v-for="(userInfo, username) in sortedRepositories" :key="username">
                <b-popover v-if="userInfo.hasOwnProperty('followers')" :target="`${username}-popover`" placement="right"
                    :title="`${username}'s Followers`" :content="userInfo.followers" triggers="hover" :no-fade="true">
                </b-popover>
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
            repositories: [],
            showError: false,
            errorMessage: ''
        }
    },
    mounted() {
        this.getRepositories();
    },
    methods: {
        async getRepositories() {
            try {
                let response = await axios.get(`http://localhost:${SERVER_PORT}/repositories`);
                this.repositories = response.data;
            } catch(error) {
                this.showError = true;
                if (error.response.status === 403) {
                    this.errorMessage = error.response.data;
                } else {
                    this.errorMessage = 'The server appears to be down. Run it with npm start in the command prompt.';
                }
            }
        }
    },
    computed: {
        sortedRepositories() {
            let sorted = {};
            Object.keys(this.repositories).sort((a, b) => {
                a = a.toLowerCase();
                b = b.toLowerCase();
                if (a < b) return -1;
                if (a > b) return 1;
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
        width: 100px;
    }

    .alert {
        margin-top: 60px;
    }
</style>
