<script setup>
import { BxSolidImageAdd, BxArrowBack } from '@kalimahapps/vue-icons';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from "vue-router"
import { authFetch } from "@/composables/useAuthFetch.js"
import SkeletonBox from '@/components/ui/SkeletonBox.vue';
import BrutalButton from "@/components/ui/BrutalButton.vue";

const name = ref('')
const description = ref('')
const category = ref('')
const location = ref('')
const year = ref('')
const realURL = ref('')
const githubURL = ref('')
const images = ref({
  image1: '',
  image2: '',
  image3: '',
  image4: '',
})

const stack = ref([])
const stackOptions = ref([])
const type = ref([])
const typeOptions = ref([])
const infrastructure = ref([])
const infrastructureOptions = ref([])

function toggleTag(array, tag) {
  if (array.includes(tag)) {
    const index = array.indexOf(tag)
    array.splice(index, 1)
  } else {
    array.push(tag)
  }
}

const loading = ref(false)
const error = ref(null)
const route = useRoute()

onMounted(async () => {
  loading.value = true

  try {
    const schemaResponse = await authFetch('/api/admin/schema', {
      method: "GET",
    })

    if (schemaResponse.ok) {
      const schemaData = await schemaResponse.json()
      stackOptions.value = schemaData.stack
      typeOptions.value = schemaData.type
      infrastructureOptions.value = schemaData.infrastructure
    }

    const projectsResponse = await fetch('/api/projects')

    const projectsData = await projectsResponse.json()
    projectsData.records = projectsData.records.map((item) => ({
      id: item.id,
      ...item.fields,
    }))

    const foundProject = projectsData.records.find((p) => p.id === route.params.id)

    if (foundProject) {
      name.value = foundProject.Name
      description.value = foundProject.Description
      category.value = foundProject.Category
      location.value = foundProject.Location
      year.value = foundProject.Year
      realURL.value = foundProject.realURL
      githubURL.value = foundProject.GithubURL
      images.value = {
        image1: foundProject.Image1 || '',
        image2: foundProject.Image2 || '',
        image3: foundProject.Image3 || '',
        image4: foundProject.Image4 || '',
      }
      stack.value = foundProject.Stack || []
      type.value = foundProject.Type || []
      infrastructure.value = foundProject.Infrastructure || []
    }

  } catch (e) {
    error.value = e.message
    console.error(e)
  } finally {
    loading.value = false
  }
})

const router = useRouter()

const handleSubmit = async () => {
  try {
    const isEditMode = route.params.id !== undefined
    const method = isEditMode ? "PATCH" : "POST"
    const url = isEditMode ? `/api/admin/projects/?id=${route.params.id}` : '/api/admin/projects'

    const body = {
      Name: name.value,
      Description: description.value,
      Category: category.value,
      Location: location.value,
      Year: year.value,
      realURL: realURL.value,
      GithubURL: githubURL.value,
      Image1: images.value.image1,
      Image2: images.value.image2,
      Image3: images.value.image3,
      Image4: images.value.image4,
      Stack: stack.value,
      Type: type.value,
      Infrastructure: infrastructure.value,
    }

    // console.log('Submit payload:', body)

    const response = await authFetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      router.push('/admin')
    }

  } catch (e) {
    console.error('Saving failed:', e);
  }
}

</script>

<template>
  <div class="min-h-screen bg-background">

    <!-- HEADER -->
    <header class="border-b-4 border-black bg-white sticky top-0 z-30">
      <div class="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div>
          <span
            class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-1">
            DASHBOARD //
          </span>
          <h1 class="font-display text-2xl sm:text-3xl uppercase tracking-wide text-black">
            New Project
          </h1>
        </div>

        <BrutalButton type="button" @click="router.push('/admin')"
          bg-class="bg-stone-100 text-black text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3">
          <BxArrowBack class="inline-block" /> Back
        </BrutalButton>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 py-8">

      <!-- LOADING VIA SKELETON -->
      <div v-if="loading" class="bg-white border-4 border-black shadow-xl p-6 sm:p-8 flex flex-col gap-6">

        <!-- BASIC_INFO section -->
        <div class="flex flex-col gap-4">
          <SkeletonBox width="w-36" height="h-5" />
          <!-- Name -->
          <SkeletonBox height="h-10" />
          <!-- Category + Location -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkeletonBox height="h-10" />
            <SkeletonBox height="h-10" />
          </div>
          <!-- Year -->
          <SkeletonBox width="w-1/2" height="h-10" />
          <!-- Description -->
          <SkeletonBox height="h-24" />
        </div>

        <!-- TECH_TAGS section -->
        <div class="flex flex-col gap-4 pt-2 border-t-2 border-black/10">
          <SkeletonBox width="w-28" height="h-5" />
          <!-- Stack -->
          <div class="flex flex-wrap gap-2">
            <SkeletonBox v-for="n in 5" :key="'s' + n" width="w-16" height="h-8" />
          </div>
          <!-- Type -->
          <div class="flex flex-wrap gap-2">
            <SkeletonBox v-for="n in 3" :key="'t' + n" width="w-20" height="h-8" />
          </div>
          <!-- Infrastructure -->
          <div class="flex flex-wrap gap-2">
            <SkeletonBox v-for="n in 4" :key="'i' + n" width="w-16" height="h-8" />
          </div>
        </div>

        <!-- LINKS section -->
        <div class="flex flex-col gap-4 pt-2 border-t-2 border-black/10">
          <SkeletonBox width="w-20" height="h-5" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkeletonBox height="h-10" />
            <SkeletonBox height="h-10" />
          </div>
        </div>

        <!-- IMAGES section -->
        <div class="flex flex-col gap-4 pt-2 border-t-2 border-black/10">
          <SkeletonBox width="w-24" height="h-5" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkeletonBox v-for="n in 4" :key="'img' + n" height="h-10" />
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-black/10">
          <SkeletonBox height="h-12" />
          <SkeletonBox width="w-32" height="h-12" />
        </div>

      </div>

      <!-- FORM -->
      <form v-else @submit.prevent="handleSubmit"
        class="bg-white border-4 border-black shadow-xl p-6 sm:p-8 flex flex-col gap-6">

        <!-- BASIC INFO -->
        <div class="flex flex-col gap-4">
          <span
            class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block w-fit">
            BASIC_INFO //
          </span>

          <!-- Name -->
          <div>
            <label class="block font-black text-xs uppercase tracking-wider mb-1 text-black">Name</label>
            <input v-model="name" type="text" placeholder="Project name"
              class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors">
          </div>

          <!-- Category + Location -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <!-- Category (single select) -->
            <div>
              <label class="block font-black text-xs uppercase tracking-wider mb-1 text-black">Category</label>
              <select v-model="category"
                class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors">
                <option value="">Select category</option>
                <option value="Commercial project">Commercial project</option>
                <option value="Personal project">Pet project</option>
              </select>
            </div>

            <!-- Location -->
            <div>
              <label class="block font-black text-xs uppercase tracking-wider mb-1 text-black">Location</label>
              <input v-model="location" type="text" placeholder="City, Country"
                class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors">
            </div>

          </div>

          <!-- Year -->
          <div class="sm:w-1/2">
            <label class="block font-black text-xs uppercase tracking-wider mb-1 text-black">Year</label>
            <input v-model="year" type="date"
              class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors">
          </div>

          <!-- Description -->
          <div>
            <label class="block font-black text-xs uppercase tracking-wider mb-1 text-black">Description</label>
            <textarea v-model="description" rows="4" placeholder="Short description of the project..."
              class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors resize-none"></textarea>
          </div>
        </div>

        <!-- TAGS -->
        <div class="flex flex-col gap-4 pt-2 border-t-2 border-black/10">
          <span
            class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block w-fit">
            TECH_TAGS //
          </span>

          <!-- STACK (multiselect) -->
          <div>
            <label class="block font-black text-xs uppercase tracking-wider mb-2 text-black">Stack</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="tag in stackOptions" :key="tag" type="button" @click="toggleTag(stack, tag)"
                class="font-mono text-xs uppercase font-bold border-2 border-black px-3 py-1.5 brutal-clickable"
                :class="stack.includes(tag) ? 'bg-primary' : 'bg-white'">
                {{ tag }}
              </button>
            </div>
          </div>

          <!-- TYPE (multiselect) -->
          <div>
            <label class="block font-black text-xs uppercase tracking-wider mb-2 text-black">Type</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="tag in typeOptions" :key="tag" type="button" @click="toggleTag(type, tag)"
                class="font-mono text-xs uppercase font-bold border-2 border-black px-3 py-1.5 brutal-clickable"
                :class="type.includes(tag) ? 'bg-primary' : 'bg-white'">
                {{ tag }}
              </button>
            </div>
          </div>

          <!-- INFRASTRUCTURE (multiselect) -->
          <div>
            <label class="block font-black text-xs uppercase tracking-wider mb-2 text-black">Infrastructure</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="tag in infrastructureOptions" :key="tag" type="button"
                @click="toggleTag(infrastructure, tag)"
                class="font-mono text-xs uppercase font-bold border-2 border-black px-3 py-1.5 brutal-clickable"
                :class="infrastructure.includes(tag) ? 'bg-primary' : 'bg-white'">
                {{ tag }}
              </button>
            </div>
          </div>
        </div>

        <!-- LINKS -->
        <div class="flex flex-col gap-4 pt-2 border-t-2 border-black/10">
          <span
            class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block w-fit">
            LINKS //
          </span>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-black text-xs uppercase tracking-wider mb-1 text-black">Live URL</label>
              <input v-model="realURL" type="url" placeholder="https://example.com"
                class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors">
            </div>

            <div>
              <label class="block font-black text-xs uppercase tracking-wider mb-1 text-black">GitHub URL</label>
              <input v-model="githubURL" type="url" placeholder="https://github.com/..."
                class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors">
            </div>
          </div>
        </div>

        <!-- IMGs -->
        <div class="flex flex-col gap-4 pt-2 border-t-2 border-black/10">
          <span
            class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block w-fit">
            IMAGES //
          </span>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div v-for="n in 4" :key="n">
              <label class="block font-black text-xs uppercase tracking-wider mb-1 text-black">
                Image {{ n }}
              </label>
              <div class="flex items-center gap-2">
                <BxSolidImageAdd class="text-lg shrink-0" />
                <input v-model="images['image' + n]" type="url" placeholder="Cloudinary image URL"
                  class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors">
              </div>
            </div>

          </div>
        </div>

        <!-- ACTION BTNs -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-black/10">
        <BrutalButton type="submit" bg-class="bg-primary text-black px-6 py-3 flex-1">
          Save Project
        </BrutalButton>
        <BrutalButton type="button" bg-class="bg-stone-200 text-black px-6 py-3" @click="router.push('/admin')">
          Cancel
        </BrutalButton>
        </div>

      </form>

    </main>

  </div>
</template>

<style scoped></style>