<template>
    <div class="flex w-1/6">
        <USelectMenu v-model="form.attack" :options="Object.values(EAttacks)" size="lg" color="secondary" class="w-full" placeholder="Select attack"/>
    </div>
</template>

<script setup lang="ts">
import { EAttacks } from '~/commons/enums/attacks-enum';
const form = useJwtForm().value;
</script>
