<template>
    <div class="flex justify-center">
        <USelectMenu v-model="algorithm":options="Object.keys(EAlgorithms)" size="lg" color="gray" class="w-1/3" placeholder="Select algorithm"/>
    </div>
</template>

<script setup lang="ts">
import { EAlgorithms } from '~/commons/enums/algorithms-enum';
const jwtParts = useJwtParts().value;

const algorithm = ref(EAlgorithms.HS256);

watch(algorithm, async () => {
    const header = JSON.parse(jwtParts.header);
    header['alg'] = algorithm.value;
    jwtParts.header = JSON.stringify(header, null, 2);
})

</script>