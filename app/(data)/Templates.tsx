export default [
  {
    name: "Blog Title",
    desc: "An AI tool that generates blog titles based on your blog information.",
    category: "Blog",
    icon: "https://img.freepik.com/free-vector/hand-drawn-iranian-women-illustration_23-2149855990.jpg?t=st=1721826933~exp=1721830533~hmac=15d314c19444fd5aa38f6a9235f0d1854c9d13a4b1479584c031ce7a640bb781&w=900",
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
    icon: "https://img.freepik.com/free-vector/flat-cms-concept-illustrated_23-2148925795.jpg?t=st=1721830431~exp=1721834031~hmac=38c006386a063a3861b2131508a0389083382ff4611a500115f426ed404cadbd&w=900",
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
    icon: "https://img.freepik.com/free-vector/hand-drawn-essay-illustration_23-2150315303.jpg?t=st=1721830044~exp=1721833644~hmac=9dc217f903b90f47a152f4fcfd8e2aeb93281084b8c7ec0cbe2489557c677497&w=740",
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
    icon: "https://img.freepik.com/free-vector/influencer-recording-new-video_52683-37608.jpg?t=st=1721830603~exp=1721834203~hmac=84ee676fe357ad556685bf300cf80f174adb2c65ec63e6485fee6d694020aaf7&w=1060",
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
    icon: "https://img.freepik.com/free-vector/hand-drawn-blogger-illustration_23-2149086390.jpg?t=st=1721886198~exp=1721889798~hmac=5f194f250b63c1d2ec25cd7230ba6ce1322e3115a82465eed7177ee19f449ba9&w=740",
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
    icon: "https://img.freepik.com/free-vector/flat-design-unboxing-illustration_23-2150306505.jpg?t=st=1721830858~exp=1721834458~hmac=5dfab7c09a1aaa85f3891a1cd331a2340fb7da5df573365ea3b519a3ed88935e&w=1060",
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
    icon: "https://img.freepik.com/free-vector/hand-drawn-essay-illustration_52683-111953.jpg?t=st=1721830929~exp=1721834529~hmac=c0f938c76e525aee7ee691613ad5d570134f94da04380427d63ace2e41c98827&w=740",
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
    image: "",
    vist: "232",
    icon: "https://img.freepik.com/free-vector/english-book-illustration-design_23-2149501740.jpg?t=st=1721831053~exp=1721834653~hmac=589fd257028a758c65efa666cd75b5b7c8183dae07e2aeaca9878671ffbf0662&w=740",
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
    icon: "https://img.freepik.com/free-vector/sharing-content-social-media-with-woman-holding-smartphone_23-2148519025.jpg?t=st=1721831126~exp=1721834726~hmac=203aa65fe7243e3d6fcb87203ba4cb4a0e98fc01eb5c16da66f66d05ebd870a3&w=740",
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
    icon: "https://img.freepik.com/free-vector/person-addicted-social-media_23-2148390871.jpg?t=st=1721831211~exp=1721834811~hmac=bf4fde821ab7d53301e2e379f5a2190e27f0e68e3750978f8f3fc8f6f1059055&w=740",
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
    icon: "https://img.freepik.com/free-vector/social-media-marketing-mobile-phone-concept_23-2148430942.jpg?t=st=1721831266~exp=1721834866~hmac=d8ddf9b469a4115496c102535a0275bf3944f567f8852f4e99aabb475333c903&w=740",
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
    icon: "https://img.freepik.com/free-vector/gradient-instagram-post-frame_52683-146739.jpg?t=st=1721831319~exp=1721834919~hmac=8f8779e31767f1d77009f4bf71e6c5ad664d1df6fa40ecb67fde74c5974ec17d&w=740",
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
    icon: "https://img.freepik.com/free-vector/people-speaking-different-languages-with-flat-design_23-2147863366.jpg?t=st=1721831397~exp=1721834997~hmac=830df573275fda60b7fee97d813e0137c5838d2db428b371c4d406de0df6542e&w=740",
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
    icon: "https://img.freepik.com/free-vector/programmer-doing-his-job-flat-design_52683-14150.jpg?t=st=1721831453~exp=1721835053~hmac=5426f00d4904b6e3abfdebf2b6fdf2457c6c00434275953d090291e892b5234b&w=740",
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
    icon: "https://img.freepik.com/free-vector/people-with-technology-devices_23-2148458555.jpg?t=st=1721831527~exp=1721835127~hmac=4579973580b0d0c0650a10aa1d951cade94d1d6f17fa02e922c2a461d6038788&w=740",
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
    icon: "https://img.freepik.com/free-vector/debugger-profession-programmer-code-analytic-debug-process-flat-isometric_126523-1769.jpg?t=st=1721831586~exp=1721835186~hmac=c46425c273eef298048c6cb270b6f7ae31ef9499a94ba26321d97015471db055&w=740",
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
    icon: "https://img.freepik.com/free-vector/summer-sale-design-with-trendy-blue-clothes_1324-154.jpg?t=st=1721831749~exp=1721835349~hmac=4b2864781a120ee2472e142354dab4951fff2ac9f48fe322387066d6c09d4551&w=740",
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
    icon: "https://img.freepik.com/free-vector/flat-design-food-manufacturing-illustration_23-2149486456.jpg?t=st=1721831857~exp=1721835457~hmac=74ac8322db6216af0b70f730b5850e1a9d02211a5c24f409810f283e37fb94b5&w=740",
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
