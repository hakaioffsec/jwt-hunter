<template>
    <div class="flex justify-center">
        <USelectMenu v-model="attackOptions.options.payload" :options="Object.values(EKidPayload)" size="lg" color="gray" class="w-1/3" placeholder="Select attack"/>
    </div>
</template>

<script setup lang="ts">

import { EAlgorithms } from '~/commons/enums/algorithms-enum';
import { EKidPayload } from '~/commons/enums/kid-payloads-enum';
import type { IAttack } from '~/commons/interfaces/attack-interface';
import { useTokenStore } from '~/stores/useTokenStore';

const attackOptions = reactive({
    options: {},
    algorithms: Object.values(EAlgorithms),
} as IAttack);

const form = useJwtForm().value
const token = useTokenStore()

watch([token, attackOptions], () => {
    removeErrors(['jwt-token']);

    try {
        const payload = kidPathTraversal(token.value, attackOptions.options.payload);
        form.payload = payload
    } catch (e) {
        addErrors(['jwt-token']);
    }
})

</script>