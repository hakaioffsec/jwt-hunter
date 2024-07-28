<template>
    <label for="payload" class="block text-left text-white font-normal text-2xl mb-4">Payload</label>
    <div class="w-full relative border border-secondary-300 bg-secondary rounded-md">
        <ClipboardButton :text-to-copy="form.payload" />
        <div class="px-6 py-6">
            <UTextarea @click="copyToClipboard(form.payload)" aria-readonly="true" autoresize v-model="form.payload" variant="none" :rows=0 spellcheck="false" textareaClass="text-md w-full focus:outline-none text-jwt-sign focus:border-gray-600 cursor-default"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
const form = useJwtForm().value;
import { toast, type ToastOptions } from 'vue3-toastify'

const successNotify = (message: string) => {
  toast(message, {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type: 'success',
    theme: 'dark',
    transition: 'zoom',
    toastStyle: {
        backgroundColor: '#161B22'
    }
  } as ToastOptions)
}

const copyToClipboard = (message: string) => {
    if(message) {
        navigator.clipboard.writeText(message).then(() => {
            successNotify('Copied to clipboard!');
        }).catch(err => {
            console.error(err)
        })
    }
}
</script>