<template>
    <div>
        Vue Test
        <p v-for="(content, i) in handler.contents" :key="i">
            {{ content }}
        </p>
    </div>
</template>

<script lang="ts" src="./app.js"></script>