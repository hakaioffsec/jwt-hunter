<template>
    <div class="flex w-1/6">
        <USelectMenu v-slot="{ open }" v-model="form.attack" :options="Object.values(EAttacks)" color="secondary" size="lg" class="w-full"/>
    </div>
</template>

<script setup lang="ts">
import { EAttacks } from '~/commons/enums/attacks-enum';
const form = useJwtForm().value;
</script>
