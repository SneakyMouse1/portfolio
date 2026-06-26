<script setup>
import { onMounted, ref } from "vue";
import BrutalButton from "@/components/ui/BrutalButton.vue";
import BrutalInput from "@/components/ui/Inputs/BrutalInput.vue";
import BrutalModal from "@/components/ui/BrutalModal.vue";
import { BxSolidError, McSandglassLine } from '@kalimahapps/vue-icons';
import { useRouter } from "vue-router";
import { authFetch } from "@/composables/useAuthFetch.js"
import SkeletonBox from '@/components/ui/SkeletonBox.vue';

const portfolio = ref([])
const deleteTarget = ref(null)
const deleteConfirmText = ref('')
const loading = ref(false)
const error = ref(null)

const router = useRouter()

// FETCH DATA
onMounted(async () => {
  loading.value = true

  try {
    const response = await fetch('/api/projects')
    // console.log('response ', response)
    const data = await response.json()
    // console.log('data ', data)
    portfolio.value = data.records.map((item) => ({
      id: item.id,
      ...item.fields,
    }))
    // console.log('portfolio ', portfolio)
  } catch (e) {
    error.value = e.message
    console.error(e)
  } finally {
    loading.value = false
  }
})

// LOGOUT
const handleLogout = async () => {
  try {
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  } catch (e) {
    console.error('Logout failed:', e);
  }
}

// DELETE
const handleDelete = async () => {
  try {
    const request = await authFetch('/api/admin/projects?id=' + deleteTarget.value.id, {
      method: "DELETE",
    })
    if (request.ok) {
      portfolio.value = portfolio.value.filter(p => p.id !== deleteTarget.value.id)
      deleteTarget.value = null, deleteConfirmText.value = ''
    } else {
      error.value = 'Failed to delete project'
    }

  } catch (e) {
    console.error('Delete failed:', e);
  }
}

</script>

<template>
  <div class="min-h-screen bg-background">

    <!-- HEADER -->
    <header class="border-b-4 border-black bg-white sticky top-0 z-30">
      <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div>
          <span
            class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-1">
            DASHBOARD //
          </span>
          <h1 class="font-display text-2xl sm:text-3xl uppercase tracking-wide text-black">
            Project Manager
          </h1>
        </div>

        <BrutalButton @click="handleLogout()"
          bg-class="bg-brutal-black text-white text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3">
          Log Out
        </BrutalButton>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-8">

      <!-- TOP ADD BTN -->
      <div class="mb-6">
        <BrutalButton @click="router.push('/admin/project/new')"
          bg-class="bg-primary text-black w-full sm:w-auto px-6 py-3">
          + Add New Project
        </BrutalButton>
      </div>

      <!-- LOADING VIA SKELETON -->
      <div v-if="loading" class="flex flex-col gap-4">
        <div v-for="n in 5" :key="n"
          class="bg-white border-3 border-black shadow-md p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
          <!-- IMG -->
          <SkeletonBox width="w-16 sm:w-20" height="h-16 sm:h-20" class="shrink-0" />
          <!-- TEXT -->
          <div class="flex-1 flex flex-col gap-2">
            <SkeletonBox height="h-5" width="w-48" />
            <SkeletonBox height="h-3" width="w-64" />
          </div>
          <!-- EDIT/DELETE BUTTONS -->
          <div class="flex flex-col sm:flex-row gap-2 shrink-0">
            <SkeletonBox width="w-16" height="h-8" />
            <SkeletonBox width="w-16" height="h-8" />
          </div>
        </div>
      </div>


      <!-- ERROR -->
      <div v-else-if="error"
        class="font-mono text-xs text-brutal-white bg-brutal-red border-2 border-black p-4 shadow-sm font-bold uppercase flex items-center gap-2">
        <BxSolidError /> {{ error }}
      </div>

      <!-- PROJECTS-->
      <div v-else class="flex flex-col gap-4">
        <div v-for="project in portfolio" :key="project.id"
          class="bg-white border-3 border-black shadow-md p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
          <!-- THUMB -->
          <div class="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black bg-stone-100 shrink-0 overflow-hidden">
            <img v-if="project.Image1" :src="project.Image1" :alt="project.Name" class="w-full h-full object-cover">
            <div v-else
              class="w-full h-full flex items-center justify-center font-mono text-[10px] text-stone-400 uppercase">
              No img
            </div>
          </div>

          <!-- INFO -->
          <div class="flex-1 min-w-0">
            <h3 class="font-display text-lg sm:text-xl uppercase text-black truncate">
              {{ project.Name }}
            </h3>
            <p class="font-mono text-xs text-stone-500 truncate">
              {{ project.Description }}
            </p>
          </div>

          <!-- EDIT/DELETE BTNs -->
          <div class="flex flex-col sm:flex-row gap-2 shrink-0">
            <BrutalButton @click="router.push('admin/project/' + project.id)"
              bg-class="bg-brutal-blue text-white text-xs px-3 py-2">
              Edit
            </BrutalButton>
            <BrutalButton bg-class="bg-brutal-red text-white text-xs px-3 py-2" @click="deleteTarget = project">
              Delete
            </BrutalButton>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div v-if="portfolio.length === 0"
          class="font-mono text-xs text-stone-500 uppercase bg-white border-2 border-black p-6 text-center">
          No projects yet // click "Add New Project" to start
        </div>
      </div>

      <!-- BOTTOM ADD BTN -->
      <div class="mt-6">
        <BrutalButton @click="router.push('/admin/project/new')"
          bg-class="bg-primary text-black w-full sm:w-auto px-6 py-3">
          + Add New Project
        </BrutalButton>
      </div>

    </main>

    <!-- DELETE CONFIRM MODAL -->
    <BrutalModal :isOpen="deleteTarget !== null" @close="deleteTarget = null; deleteConfirmText = ''">
      <div v-if="deleteTarget" class="flex flex-col gap-4">

        <div class="flex items-center gap-2 text-brutal-red">
          <BxSolidError class="text-2xl" />
          <h2 class="font-display text-2xl uppercase text-black">
            Delete Project
          </h2>
        </div>

        <p class="font-mono text-xs text-stone-700 leading-relaxed">
          You are about to permanently delete
          <span class="font-bold text-black">"{{ deleteTarget.Name }}"</span>.
          This action cannot be undone.
        </p>

        <p class="font-mono text-xs text-stone-700 uppercase">
          Type <span class="font-bold text-brutal-red">YES</span> below to confirm:
        </p>

        <BrutalInput v-model="deleteConfirmText" type="text" placeholder="type YES to confirm" />

      </div>

      <template #actions>
        <BrutalButton bg-class="bg-stone-200 text-black text-xs px-4 py-2"
          @click="deleteTarget = null; deleteConfirmText = ''">
          Cancel
        </BrutalButton>
        <BrutalButton @click="handleDelete" bg-class="bg-brutal-red text-white text-xs px-4 py-2"
          :class="{ 'opacity-40 pointer-events-none': deleteConfirmText.toLowerCase() !== 'yes' }">
          Confirm Delete
        </BrutalButton>
      </template>
    </BrutalModal>

  </div>
</template>

<style scoped></style>