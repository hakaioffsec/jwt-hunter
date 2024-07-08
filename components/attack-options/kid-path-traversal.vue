<template>
    <div class="flex justify-center">
        <USelectMenu v-model="attackOptions.options.payload" :options="Object.values(EKidPayload)" size="lg" color="gray" class="w-1/3" placeholder="Select attack"/>
    </div>
</template>

<script setup lang="ts">

import { EAlgorithms } from '~/commons/enums/algorithms-enum';
import { EKidPayload } from '~/commons/enums/kid-payloads-enum';
import type { IAttack } from '~/commons/interfaces/attack-interface';

const attackOptions = reactive({
    options: {},
    algorithms: Object.values(EAlgorithms),
} as IAttack);

const form = useJwtForm().value

watch([form, attackOptions], () => {
    removeErrors(['jwt-token']);

    try {
        const payload = kidPathTraversal(form.token, attackOptions.options.payload);
        form.payload = payload
        form.token = payload
    } catch (e) {
        addErrors(['jwt-token']);
    }
})

</script>