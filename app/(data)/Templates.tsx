export default [
  {
    name: "Blog Title",
    desc: "An AI tool that generates blog titles based on your blog information.",
    category: "Blog",
    icon: "https://i.ibb.co/BBGGCX0/media-player-concept-illustration-114360-3331.jpg",
    aiPrompt:
      "Generate 5 blog topic ideas in bullet points based on the given niche and outline. The results should be in Rich Text Editor format.",
    slug: "generate-blog-title",
    image: "",
    vist: "344",
    form: [
      {
        label: "Enter your blog niche",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
  },
  {
    name: "Blog Content",
    desc: "An AI tool that generates blog content based on the given topic and outline.",
    category: "Blog",
    icon: "https://i.ibb.co/fXDX8Nn/load-more-concept-illustration-114360-3033.jpg",
    slug: "blog-content-generation",
    aiPrompt:
      "Generate detailed blog content based on the given topic and outline. The result should be in Rich Text Editor format.",
    image: "",
    vist: "455",
    form: [
      {
        label: "Enter your blog topic",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "Blog Topic Ideas",
    desc: "An AI tool that generates catchy and viral-worthy blog topic ideas.",
    category: "Blog",
    icon: "https://i.ibb.co/xmyMkRN/flat-autumn-illustration-23-2149115982.jpg",
    slug: "blog-topic-idea",
    aiPrompt:
      "Generate the top 5 blog topic ideas in bullet points based on the given niche. The results should be in Rich Text Editor format.",
    image: "",
    vist: "",
    form: [
      {
        label: "Enter your niche",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
  },
  {
    name: "Youtube Title",
    desc: "An AI tool that generates optimized high-ranked titles for YouTube videos.",
    category: "Youtube Tools",
    icon: "https://i.ibb.co/5F7VLFQ/De-Watermark-ai-1722685353597.png",
    slug: "youtube-seo-title",
    aiPrompt:
      "Generate the best SEO optimized high-ranked 5 title ideas in bullet points based on the given keywords and outline. The results should be in HTML tags format.",
    image: "",
    vist: "544",
    form: [
      {
        label: "Enter your YouTube video topic keywords",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Youtube Description",
    desc: "An AI tool that generates catchy and viral-worthy YouTube descriptions.",
    category: "Youtube Tool",
    icon: "https://i.ibb.co/wcfr1XF/influencer-recording-new-video-23-2148522553.jpg",
    slug: "youtube-description",
    aiPrompt:
      "Generate a YouTube description with emojis under 4-5 lines based on the given topic and outline. The results should be in Rich Text Editor format.",
    image: "",
    vist: "344",
    form: [
      {
        label: "Enter your YouTube video topic/title",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "Youtube Tags",
    desc: "An AI tool that generates catchy and viral-worthy YouTube tags.",
    category: "Youtube Tool",
    icon: "https://i.ibb.co/fdP7wzp/flat-design-unboxing-illustration-23-2150306505-transformed.jpg",
    slug: "youtube-tag",
    aiPrompt:
      "Generate 10 YouTube tags in bullet points based on the given title and outline. The results should be in Rich Text Editor format.",
    image: "",
    vist: "233",
    form: [
      {
        label: "Enter your YouTube title",
        field: "input",
        name: "title",
        required: true,
      },
    ],
  },
  {
    name: "Rewrite Article (Plagiarism Free)",
    desc: "Use this tool to rewrite existing articles or blog posts to bypass AI detectors and ensure they are plagiarism-free.",
    image: "",
    vist: "544",
    icon: "https://i.ibb.co/wC9QZth/rhn-Ju-Ebxk-X8go9do-WNXck-transformed.jpg",
    category: "Rewriting Tool",
    slug: "rewrite-article",
    aiPrompt:
      "Rewrite the given article without any plagiarism. The results should be in Rich Text Editor format.",
    form: [
      {
        label: "Provide your article/blog post or any other content to rewrite",
        field: "input",
        name: "article",
        required: true,
      },
    ],
  },
  {
    name: "Text Improver",
    desc: "This tool refines your writing, eliminating errors and redundancies for a clear, readable result. It also offers tone analysis and suggests better word choices.",
    image:
      "https://i.ibb.co/dJwFpQJ/flat-employee-appreciation-day-illustration-23-2151220497.jpg",
    vist: "232",
    icon: "https://i.ibb.co/dJwFpQJ/flat-employee-appreciation-day-illustration-23-2151220497.jpg",
    category: "Writing Assistant",
    slug: "text-improver",
    aiPrompt:
      "Rewrite the given text without any grammar mistakes and make it professional. The results should be in Rich Text Editor format.",
    form: [
      {
        label: "Enter text that you want to rewrite or improve",
        field: "input",
        name: "textToImprove",
        required: true,
      },
    ],
  },
  {
    name: "Add Emojis to Text",
    desc: "An AI tool that adds emojis to your text based on the given outline.",
    icon: "https://i.ibb.co/KL9tvDH/M7f8y-Ht-se8tn-N5-N9nz-QT-transformed.jpg",
    category: "Blog",
    slug: "add-emoji-to-text",
    aiPrompt:
      "Add emojis to the given outline text and rewrite it. The results should be in Rich Text Editor format.",
    form: [
      {
        label: "Enter your text to add emojis",
        field: "input",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post Generator",
    desc: "An AI tool that generates Instagram posts based on given keywords.",
    icon: "https://i.ibb.co/v3SXF1L/illustration-with-person-addicted-social-media-design-23-2148415707.jpg",
    category: "Blog",
    slug: "instagram-post-generator",
    aiPrompt:
      "Generate 3 Instagram posts based on the given keywords. The results should be in Rich Text Editor format.",
    form: [
      {
        label: "Enter keywords for your post",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Hash Tag Generator",
    desc: "An AI tool that generates Instagram hashtags based on given keywords.",
    icon: "https://i.ibb.co/jfHKNF5/person-addicted-social-media-23-2148414752.jpg",
    category: "Blog",
    slug: "instagram-hash-tag-generator",
    aiPrompt:
      "Generate 15 Instagram hashtags based on the given keywords. The results should be in Rich Text Editor format.",
    form: [
      {
        label: "Enter keywords for your Instagram hashtags",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post/Reel Idea",
    desc: "An AI tool that generates new and trending Instagram post ideas based on your niche.",
    icon: "https://i.ibb.co/PcT101S/m-CLDE9-Rw-I1-Vhgw-PTk-EIIb-transformed.jpg",
    category: "Instagram",
    slug: "instagram-post-idea-generator",
    aiPrompt:
      "Generate 5-10 Instagram post ideas based on the given niche with the latest trends. The results should be in Rich Text Editor format.",
    form: [
      {
        label: "Enter keywords/niche for your Instagram ideas",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "English Grammar Check",
    desc: "An AI tool that corrects your English grammar by providing the text.",
    icon: "https://i.ibb.co/Cv5pzkx/hand-drawn-flat-new-year-s-resolutions-illustration-23-2149193694.jpg",
    category: "English",
    slug: "english-grammar-checker",
    aiPrompt:
      "Rewrite the given text by correcting the grammar. The results should be in Rich Text Editor format.",
    form: [
      {
        label: "Enter text to correct the grammar",
        field: "input",
        name: "inputText",
        required: true,
      },
    ],
  },
  {
    name: "Write Code",
    desc: "Generate programming code based on your description in any language.",
    icon: "https://i.ibb.co/j5q0mmG/app-development-illustration-52683-47931.jpg",
    category: "Coding",
    slug: "write-code",
    aiPrompt:
      "Please provide a detailed description of the code you need, including the programming language. I will write the code for you and present it in a code block format.",
    form: [
      {
        label: "Describe the code you need, including the programming language",
        field: "input",
        name: "codeDescription",
        required: true,
      },
    ],
  },
  {
    name: "Explain Code",
    desc: "Get a detailed explanation of your programming code, broken down line by line.",
    icon: "https://i.ibb.co/gt1Pwyv/telecommuting-concept-23-2148490218.jpg",
    category: "Coding",
    slug: "explain-code",
    aiPrompt:
      "Please enter the code you want explained. I will provide a line-by-line explanation and format it in a code block.",
    form: [
      {
        label: "Enter the code you want to understand",
        field: "input",
        name: "codeDescription",
        required: true,
      },
    ],
  },
  {
    name: "Code Bug Detector",
    desc: "Identify and fix bugs in your code with detailed solutions and alternatives.",
    icon: "https://i.ibb.co/C7TZPnb/d-LOo-O3a-Liegm-Zr-P0-HYP3-S-transformed.jpg",
    category: "Coding",
    slug: "code-bug-detector",
    aiPrompt:
      "Please provide the code you suspect has bugs. I will analyze it to identify issues and provide solutions in a clear format.",
    form: [
      {
        label: "Enter the code to check for bugs",
        field: "input",
        name: "codeInput",
        required: true,
      },
    ],
  },
  {
    name: "Tagline Generator",
    desc: "Create compelling and memorable taglines for your brand or product.",
    icon: "https://i.ibb.co/hs4PHGM/cosmetics-product-realistic-composition-poster-1284-18215.jpg",
    category: "Marketing",
    slug: "tagline-generator",
    aiPrompt:
      "Provide the name of your product or brand along with a brief description of what you are selling. I will generate 5-10 catchy taglines for you.",
    form: [
      {
        label: "Enter your product or brand name",
        field: "input",
        name: "productName",
        required: true,
      },
    ],
  },
  {
    name: "Product Description",
    desc: "Craft captivating and SEO-optimized product descriptions for your e-commerce needs.",
    icon: "https://i.ibb.co/F41xxfN/sale-banner-with-product-description-1361-1333.jpg",
    category: "Marketing",
    slug: "product-description",
    aiPrompt:
      "Provide the product name and a brief description of the product. I will generate a concise and compelling product description tailored for e-commerce.",
    form: [
      {
        label: "Enter the product name",
        field: "input",
        name: "productName",
        required: true,
      },
    ],
  },
];
