<template>
    <div class="flex justify-center">
        <USelectMenu v-slot="{ open }" v-model="attackOptions.options.algorithm" :options="Object.keys(EAlgorithms).filter((alg) => alg.startsWith('HS'))" size="lg" color="gray" class="w-1/3" placeholder="Select algorithm to confuse">
            <UButton color="gray" class="flex-1 justify-between py-2.5">
                {{ attackOptions.options.algorithm }}
                <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500" :class="[open && 'transform rotate-90']" />
            </UButton>
        </USelectMenu>
    </div>
    <div class="flex flex-col w-full text-left">
        <label for="header" class="block text-white font-normal pb-4 text-2xl">Public Key</label>
        <div class="space-x-2">
            <input id="jwk-checkbox" name="jwk-checkbox" type="checkbox" v-model="attackOptions.options.useJwk" class="mb-4">
            <label for="jwk-checkbox">Use JWK to sign token</label>
        </div>
        <UTextarea autoresize v-model="publicKey" variant="none" :rows=10 id="jwt-public-key" spellcheck="false" textareaClass="text-md p-4 w-full bg-secondary border border-secondary-300 focus:border-secondary-300"/>
    </div>
</template>

<script setup lang="ts">
import * as jwkToPem from 'jwk-to-pem';
import { EAlgorithms } from '~/commons/enums/algorithms-enum';
import type { IAttack } from '~/commons/interfaces/attack-interface';
import { useTokenStore } from '~/stores/useTokenStore';

const form = useJwtForm().value;
const token = useTokenStore();

const attackOptions = reactive({
    algorithms: [EAlgorithms.RS256, EAlgorithms.RS384, EAlgorithms.RS512],
    options: {
        useJwk: false,
        secretKey: '',
        algorithm: EAlgorithms.HS256
    }
} as IAttack);

const publicKey = ref('');

watch([token, publicKey, attackOptions], async () => {
    removeClasses('jwt-public-key', ['focus:border-error', 'border-error']);
    addClasses('jwt-public-key', ['focus:border-secondary-300', 'border-secondary-300']);

    let { useJwk, secretKey, algorithm } = attackOptions.options;

    if (useJwk) {
        try {
            const jwk =  JSON.parse(publicKey.value);
            secretKey = jwkToPem.default(jwk);
        } catch (e) {
            removeClasses('jwt-public-key', ['focus:border-secondary-300', 'border-secondary-300']);
            addClasses('jwt-public-key', ['focus:border-error', 'border-error']);
            console.error(e);
            return;
        }
    } else {
        secretKey = publicKey.value;
    }

    try {
        if(algorithm && secretKey) {
            const payload = await algorithmConfusion(token.value, secretKey, algorithm);
            form.payload = payload
        }
    } catch (e) {
        addErrors(['jwt-token']);
        console.error(e);
        return;
    }
});

</script>
