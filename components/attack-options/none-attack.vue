<template>
    <div class="flex justify-center">
        <USelectMenu v-slot="{ open }" v-model="attackOptions.options.algorithm" :options="Object.values(NoneAttackEnum)" size="lg" color="gray" class="w-1/3" placeholder="Select algorithm payload">
            <UButton color="gray" class="flex-1 justify-between py-2.5">
                {{ attackOptions.options.algorithm }}
                <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500" :class="[open && 'transform rotate-90']" />
            </UButton>
        </USelectMenu>
    </div>
</template>


<script setup lang="ts">
import { EAlgorithms } from '~/commons/enums/algorithms-enum';
import { NoneAttackEnum } from '~/commons/enums/none-attack-enum';
import type { IAttack } from '~/commons/interfaces/attack-interface';
import { useTokenStore } from '~/stores/useTokenStore';

const token = useTokenStore();
const jwtParts = useJwtParts().value;
const form = useJwtForm().value;

const attackOptions = reactive({
    algorithms: Object.values(EAlgorithms),
    options: {
        algorithm: NoneAttackEnum.NONE
    }
} as IAttack);

watch(attackOptions, async () => {
    removeErrors(['jwt-token']);
    try {
        const payload = noneAttack(token.value, attackOptions.options.algorithm);
        token.value = payload;

        jwtParts.header = JSON.stringify(getJwtParts(token.value)[0], null, 2);

    } catch (e) {
        addErrors(['jwt-token']);
    }
});

watch(token, async () => {
    form.payload = token.value;
})
</script>
