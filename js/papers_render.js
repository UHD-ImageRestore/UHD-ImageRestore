// 分页相关变量 - 全局作用域
let currentPage = 1;
const itemsPerPage = 9;
let currentPapers = [];
let papersListContainer;

// 使用静态数据加载论文信息
document.addEventListener('DOMContentLoaded', function() {
    // 获取论文列表容器
    papersListContainer = document.getElementById('classic-papers-list');
    
    // 如果没有找到容器，则退出
    if (!papersListContainer) {
        console.error('未找到论文列表容器');
        return;
    }
    

    
    // 清空加载指示器
    papersListContainer.innerHTML = '';
    
    // 静态论文数据
    const papersData = [
      {
    "标题": "Dual Prompting Image Restoration with Diffusion Transformers",
    "作者": "Dehong Kong, Fan Li, Zhixin Wang, Jiaqi Xu, Renjing Pei, Wenbo Li, WenQi Ren",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Kong_Dual_Prompting_Image_Restoration_with_Diffusion_Transformers_CVPR_2025_paper.html",
    "代码仓库": "https://huggingface.co/stabilityai/stable-diffusion-3-medium",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Kong_Dual_Prompting_Image_Restoration_with_Diffusion_Transformers_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Adversarial Diffusion Compression for Real-World Image Super-Resolution",
    "作者": "Bin Chen, Gehui Li, Rongyuan Wu, Xindong Zhang, Jie Chen, Jian Zhang, Lei Zhang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Chen_Adversarial_Diffusion_Compression_for_Real-World_Image_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_Adversarial_Diffusion_Compression_for_Real-World_Image_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "UniRestore: Unified Perceptual and Task-Oriented Image Restoration Model Using Diffusion Prior",
    "作者": "I-Hsiang Chen, Wei-Ting Chen, Yu-Wei Liu, Yuan-Chun Chiang, Sy-Yen Kuo, Ming-Hsuan Yang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Chen_UniRestore_Unified_Perceptual_and_Task-Oriented_Image_Restoration_Model_Using_Diffusion_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_UniRestore_Unified_Perceptual_and_Task-Oriented_Image_Restoration_Model_Using_Diffusion_CVPR_2025_paper.pdf"
  },
  {
    "标题": "URWKV: Unified RWKV Model with Multi-state Perspective for Low-light Image Restoration",
    "作者": "Rui Xu, Yuzhen Niu, Yuezhou Li, Huangbiao Xu, Wenxi Liu, Yuzhong Chen",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Xu_URWKV_Unified_RWKV_Model_with_Multi-state_Perspective_for_Low-light_Image_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/FZU-N/URWKV",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Xu_URWKV_Unified_RWKV_Model_with_Multi-state_Perspective_for_Low-light_Image_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Diffusion-4K: Ultra-High-Resolution Image Synthesis with Latent Diffusion Models",
    "作者": "Jinjin Zhang, Qiuyu Huang, Junjie Liu, Xiefan Guo, Di Huang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Diffusion-4K_Ultra-High-Resolution_Image_Synthesis_with_Latent_Diffusion_Models_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/zhang0jhon/diffusion-4k",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Diffusion-4K_Ultra-High-Resolution_Image_Synthesis_with_Latent_Diffusion_Models_CVPR_2025_paper.pdf"
  },
  {
    "标题": "ADD: Attribution-Driven Data Augmentation Framework for Boosting Image Super-Resolution",
    "作者": "Ze-Yu Mi, Yu-Bin Yang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Mi_ADD_Attribution-Driven_Data_Augmentation_Framework_for_Boosting_Image_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/mizeyu/ADD",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Mi_ADD_Attribution-Driven_Data_Augmentation_Framework_for_Boosting_Image_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Progressive Focused Transformer for Single Image Super-Resolution",
    "作者": "Wei Long, Xingyu Zhou, Leheng Zhang, Shuhang Gu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Long_Progressive_Focused_Transformer_for_Single_Image_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/LabShuHangGU/PFT-SR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Long_Progressive_Focused_Transformer_for_Single_Image_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "FaithDiff: Unleashing Diffusion Priors for Faithful Image Super-resolution",
    "作者": "Junyang Chen, Jinshan Pan, Jiangxin Dong",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Chen_FaithDiff_Unleashing_Diffusion_Priors_for_Faithful_Image_Super-resolution_CVPR_2025_paper.html",
    "代码仓库": "https://jychen9811.github.io/FaithDiff_page/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_FaithDiff_Unleashing_Diffusion_Priors_for_Faithful_Image_Super-resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Auto-Encoded Supervision for Perceptual Image Super-Resolution",
    "作者": "MinKyu Lee, Sangeek Hyun, Woojin Jun, Jae-Pil Heo",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Lee_Auto-Encoded_Supervision_for_Perceptual_Image_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Lee_Auto-Encoded_Supervision_for_Perceptual_Image_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "AutoLUT: LUT-Based Image Super-Resolution with Automatic Sampling and Adaptive Residual Learning",
    "作者": "Yuheng Xu, Shijie Yang, Xin Liu, Jie Liu, Jie Tang, Gangshan Wu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Xu_AutoLUT_LUT-Based_Image_Super-Resolution_with_Automatic_Sampling_and_Adaptive_Residual_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Xu_AutoLUT_LUT-Based_Image_Super-Resolution_with_Automatic_Sampling_and_Adaptive_Residual_CVPR_2025_paper.pdf"
  },
  {
    "标题": "A Regularization-Guided Equivariant Approach for Image Restoration",
    "作者": "Yulu Bai, Jiahong Fu, Qi Xie, Deyu Meng",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Bai_A_Regularization-Guided_Equivariant_Approach_for_Image_Restoration_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/yulu919/EQ-REG",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Bai_A_Regularization-Guided_Equivariant_Approach_for_Image_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Zero-Shot Image Restoration Using Few-Step Guidance of Consistency Models (and Beyond)",
    "作者": "Tomer Garber, Tom Tirer",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Garber_Zero-Shot_Image_Restoration_Using_Few-Step_Guidance_of_Consistency_Models_and_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/tirer-lab/CM4IR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Garber_Zero-Shot_Image_Restoration_Using_Few-Step_Guidance_of_Consistency_Models_and_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Complexity Experts are Task-Discriminative Learners for Any Image Restoration",
    "作者": "Eduard Zamfir, Zongwei Wu, Nancy Mehta, Yuedong Tan, Danda Pani Paudel, Yulun Zhang, Radu Timofte",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zamfir_Complexity_Experts_are_Task-Discriminative_Learners_for_Any_Image_Restoration_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zamfir_Complexity_Experts_are_Task-Discriminative_Learners_for_Any_Image_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "A Universal Scale-Adaptive Deformable Transformer for Image Restoration across Diverse Artifacts",
    "作者": "Xuyi He, Yuhui Quan, Ruotao Xu, Hui Ji",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/He_A_Universal_Scale-Adaptive_Deformable_Transformer_for_Image_Restoration_across_Diverse_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/csxyhe/SADT",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/He_A_Universal_Scale-Adaptive_Deformable_Transformer_for_Image_Restoration_across_Diverse_CVPR_2025_paper.pdf"
  },
  {
    "标题": "DifIISR: A Diffusion Model with Gradient Guidance for Infrared Image Super-Resolution",
    "作者": "Xingyuan Li, Zirui Wang, Yang Zou, Zhixin Chen, Jun Ma, Zhiying Jiang, Long Ma, Jinyuan Liu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Li_DifIISR_A_Diffusion_Model_with_Gradient_Guidance_for_Infrared_Image_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/zirui0625/DifIISR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Li_DifIISR_A_Diffusion_Model_with_Gradient_Guidance_for_Infrared_Image_CVPR_2025_paper.pdf"
  },
  {
    "标题": "From Zero to Detail: Deconstructing Ultra-High-Definition Image Restoration from Progressive Spectral Perspective",
    "作者": "Chen Zhao, Zhizhou Chen, Yunzhe Xu, Enxuan Gu, Jian Li, Zili Yi, Qian Wang, Jian Yang, Ying Tai",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhao_From_Zero_to_Detail_Deconstructing_Ultra-High-Definition_Image_Restoration_from_Progressive_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhao_From_Zero_to_Detail_Deconstructing_Ultra-High-Definition_Image_Restoration_from_Progressive_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Quad-Pixel Image Defocus Deblurring: A New Benchmark and Model",
    "作者": "Hang Chen, Yin Xie, Xiaoxiu Peng, Lihu Sun, Wenkai Su, Xiaodong Yang, Chengming Liu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Chen_Quad-Pixel_Image_Defocus_Deblurring_A_New_Benchmark_and_Model_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_Quad-Pixel_Image_Defocus_Deblurring_A_New_Benchmark_and_Model_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Pippo: High-Resolution Multi-View Humans from a Single Image",
    "作者": "Yash Kant, Ethan Weber, Jin Kyu Kim, Rawal Khirodkar, Su Zhaoen, Julieta Martinez, Igor Gilitschenski, Shunsuke Saito, Timur Bagautdinov",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Kant_Pippo_High-Resolution_Multi-View_Humans_from_a_Single_Image_CVPR_2025_paper.html",
    "代码仓库": "https://yashkant.github.io/pippo/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Kant_Pippo_High-Resolution_Multi-View_Humans_from_a_Single_Image_CVPR_2025_paper.pdf"
  },
  {
    "标题": "UHD-processer: Unified UHD Image Restoration with Progressive Frequency Learning and Degradation-aware Prompts",
    "作者": "Yidi Liu, Dong Li, Xueyang Fu, Xin Lu, Jie Huang, Zheng-Jun Zha",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Liu_UHD-processer_Unified_UHD_Image_Restoration_with_Progressive_Frequency_Learning_and_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/lyd-",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Liu_UHD-processer_Unified_UHD_Image_Restoration_with_Progressive_Frequency_Learning_and_CVPR_2025_paper.pdf"
  },
  {
    "标题": "TSD-SR: One-Step Diffusion with Target Score Distillation for Real-World Image Super-Resolution",
    "作者": "Linwei Dong, Qingnan Fan, Yihong Guo, Zhonghao Wang, Qi Zhang, Jinwei Chen, Yawei Luo, Changqing Zou",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Dong_TSD-SR_One-Step_Diffusion_with_Target_Score_Distillation_for_Real-World_Image_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Dong_TSD-SR_One-Step_Diffusion_with_Target_Score_Distillation_for_Real-World_Image_CVPR_2025_paper.pdf"
  },
  {
    "标题": "FAM Diffusion: Frequency and Attention Modulation for High-Resolution Image Generation with Stable Diffusion",
    "作者": "Haosen Yang, Adrian Bulat, Isma Hadji, Hai X. Pham, Xiatian Zhu, Georgios Tzimiropoulos, Brais Martinez",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Yang_FAM_Diffusion_Frequency_and_Attention_Modulation_for_High-Resolution_Image_Generation_CVPR_2025_paper.html",
    "代码仓库": "https://happy-hsy.github.io/projects/Famdiffusion/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Yang_FAM_Diffusion_Frequency_and_Attention_Modulation_for_High-Resolution_Image_Generation_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Adaptive Dropout: Unleashing Dropout across Layers for Generalizable Image Super-Resolution",
    "作者": "Hang Xu, Jie Huang, Wei Yu, Jiangtong Tan, Zhen Zou, Feng Zhao",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Xu_Adaptive_Dropout_Unleashing_Dropout_across_Layers_for_Generalizable_Image_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/xuhang07/Adpative-Dropout",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Xu_Adaptive_Dropout_Unleashing_Dropout_across_Layers_for_Generalizable_Image_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "TSP-Mamba: The Travelling Salesman Problem Meets Mamba for Image Super-resolution and Beyond",
    "作者": "Kun Zhou, Xinyu Lin, Jiangbo Lu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhou_TSP-Mamba_The_Travelling_Salesman_Problem_Meets_Mamba_for_Image_Super-resolution_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhou_TSP-Mamba_The_Travelling_Salesman_Problem_Meets_Mamba_for_Image_Super-resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Uncertainty-guided Perturbation for Image Super-Resolution Diffusion Model",
    "作者": "Leheng Zhang, Weiyi You, Kexuan Shi, Shuhang Gu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Uncertainty-guided_Perturbation_for_Image_Super-Resolution_Diffusion_Model_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/LabShuHangGU/UPSR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Uncertainty-guided_Perturbation_for_Image_Super-Resolution_Diffusion_Model_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Navigating Image Restoration with VAR's Distribution Alignment Prior",
    "作者": "Siyang Wang, Naishan Zheng, Jie Huang, Feng Zhao",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Wang_Navigating_Image_Restoration_with_VARs_Distribution_Alignment_Prior_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_Navigating_Image_Restoration_with_VARs_Distribution_Alignment_Prior_CVPR_2025_paper.pdf"
  },
  {
    "标题": "QMambaBSR: Burst Image Super-Resolution with Query State Space Model",
    "作者": "Xin Di, Long Peng, Peizhe Xia, Wenbo Li, Renjing Pei, Yang Cao, Yang Wang, Zheng-Jun Zha",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Di_QMambaBSR_Burst_Image_Super-Resolution_with_Query_State_Space_Model_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Di_QMambaBSR_Burst_Image_Super-Resolution_with_Query_State_Space_Model_CVPR_2025_paper.pdf"
  },
  {
    "标题": "SIR-DIFF: Sparse Image Sets Restoration with Multi-View Diffusion Model",
    "作者": "Yucheng Mao, Boyang Wang, Nilesh Kulkarni, Jeong Joon Park",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Mao_SIR-DIFF_Sparse_Image_Sets_Restoration_with_Multi-View_Diffusion_Model_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Mao_SIR-DIFF_Sparse_Image_Sets_Restoration_with_Multi-View_Diffusion_Model_CVPR_2025_paper.pdf"
  },
  {
    "标题": "PIDSR: Complementary Polarized Image Demosaicing and Super-Resolution",
    "作者": "Shuangfan Zhou, Chu Zhou, Youwei Lyu, Heng Guo, Zhanyu Ma, Boxin Shi, Imari Sato",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhou_PIDSR_Complementary_Polarized_Image_Demosaicing_and_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "Code: https://github.com/PRIS-CV/PIDSR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhou_PIDSR_Complementary_Polarized_Image_Demosaicing_and_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Augmenting Perceptual Super-Resolution via Image Quality Predictors",
    "作者": "Fengjia Zhang, Samrudhdhi B. Rangrej, Tristan Aumentado-Armstrong, Afsaneh Fazly, Alex Levinshtein",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Augmenting_Perceptual_Super-Resolution_via_Image_Quality_Predictors_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/chaofengc/IQA-",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_Augmenting_Perceptual_Super-Resolution_via_Image_Quality_Predictors_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Reconciling Stochastic and Deterministic Strategies for Zero-shot Image Restoration using Diffusion Model in Dual",
    "作者": "Chong Wang, Lanqing Guo, Zixuan Fu, Siyuan Yang, Hao Cheng, Alex C. Kot, Bihan Wen",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Wang_Reconciling_Stochastic_and_Deterministic_Strategies_for_Zero-shot_Image_Restoration_using_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/ChongWang1024/RDMD",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_Reconciling_Stochastic_and_Deterministic_Strategies_for_Zero-shot_Image_Restoration_using_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Arbitrary-steps Image Super-resolution via Diffusion Inversion",
    "作者": "Zongsheng Yue, Kang Liao, Chen Change Loy",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Yue_Arbitrary-steps_Image_Super-resolution_via_Diffusion_Inversion_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Yue_Arbitrary-steps_Image_Super-resolution_via_Diffusion_Inversion_CVPR_2025_paper.pdf"
  },
  {
    "标题": "PassionSR: Post-Training Quantization with Adaptive Scale in One-Step Diffusion based Image Super-Resolution",
    "作者": "Libo Zhu, Jianze Li, Haotong Qin, Wenbo Li, Yulun Zhang, Yong Guo, Xiaokang Yang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zhu_PassionSR_Post-Training_Quantization_with_Adaptive_Scale_in_One-Step_Diffusion_based_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zhu_PassionSR_Post-Training_Quantization_with_Adaptive_Scale_in_One-Step_Diffusion_based_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Exploring Semantic Feature Discrimination for Perceptual Image Super-Resolution and Opinion-Unaware No-Reference Image Quality Assessment",
    "作者": "Guanglu Dong, Xiangyu Liao, Mingyang Li, Guihuan Guo, Chao Ren",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Dong_Exploring_Semantic_Feature_Discrimination_for_Perceptual_Image_Super-Resolution_and_Opinion-Unaware_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/GuangluDong0728/SFD",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Dong_Exploring_Semantic_Feature_Discrimination_for_Perceptual_Image_Super-Resolution_and_Opinion-Unaware_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Latent Space Super-Resolution for Higher-Resolution Image Generation with Diffusion Models",
    "作者": "Jinho Jeong, Sangmin Han, Jinwoo Kim, Seon Joo Kim",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Jeong_Latent_Space_Super-Resolution_for_Higher-Resolution_Image_Generation_with_Diffusion_Models_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/3587jjh/LSRNA",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Jeong_Latent_Space_Super-Resolution_for_Higher-Resolution_Image_Generation_with_Diffusion_Models_CVPR_2025_paper.pdf"
  },
  {
    "标题": "BF-STVSR: B-Splines and Fourier---Best Friends for High Fidelity Spatial-Temporal Video Super-Resolution",
    "作者": "Eunjin Kim, Hyeonjin Kim, Kyong Hwan Jin, Jaejun Yoo",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Kim_BF-STVSR_B-Splines_and_Fourier---Best_Friends_for_High_Fidelity_Spatial-Temporal_Video_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/facebookresearch/fvcore",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Kim_BF-STVSR_B-Splines_and_Fourier---Best_Friends_for_High_Fidelity_Spatial-Temporal_Video_CVPR_2025_paper.pdf"
  },
  {
    "标题": "JarvisIR: Elevating Autonomous Driving Perception with Intelligent Image Restoration",
    "作者": "Yunlong Lin, Zixu Lin, Haoyu Chen, Panwang Pan, Chenxin Li, Sixiang Chen, Kairun Wen, Yeying Jin, Wenbo Li, Xinghao Ding",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Lin_JarvisIR_Elevating_Autonomous_Driving_Perception_with_Intelligent_Image_Restoration_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Lin_JarvisIR_Elevating_Autonomous_Driving_Perception_with_Intelligent_Image_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "CATANet: Efficient Content-Aware Token Aggregation for Lightweight Image Super-Resolution",
    "作者": "Xin Liu, Jie Liu, Jie Tang, Gangshan Wu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Liu_CATANet_Efficient_Content-Aware_Token_Aggregation_for_Lightweight_Image_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/EquationWalker/CATANet",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Liu_CATANet_Efficient_Content-Aware_Token_Aggregation_for_Lightweight_Image_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Degradation-Aware Feature Perturbation for All-in-One Image Restoration",
    "作者": "Xiangpeng Tian, Xiangyu Liao, Xiao Liu, Meng Li, Chao Ren",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Tian_Degradation-Aware_Feature_Perturbation_for_All-in-One_Image_Restoration_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/TxpHome/DFPIR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Tian_Degradation-Aware_Feature_Perturbation_for_All-in-One_Image_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "ACL: Activating Capability of Linear Attention for Image Restoration",
    "作者": "Yubin Gu, Yuan Meng, Jiayi Ji, Xiaoshuai Sun",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Gu_ACL_Activating_Capability_of_Linear_Attention_for_Image_Restoration_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/ClimBin/ACLNet",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Gu_ACL_Activating_Capability_of_Linear_Attention_for_Image_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "GenDeg: Diffusion-based Degradation Synthesis for Generalizable All-In-One Image Restoration",
    "作者": "Sudarshan Rajagopalan, Nithin Gopalakrishnan Nair, Jay N. Paranjape, Vishal M. Patel",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Rajagopalan_GenDeg_Diffusion-based_Degradation_Synthesis_for_Generalizable_All-In-One_Image_Restoration_CVPR_2025_paper.html",
    "代码仓库": "https://sudraj2002.github.io/gendegpage/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Rajagopalan_GenDeg_Diffusion-based_Degradation_Synthesis_for_Generalizable_All-In-One_Image_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "The Power of Context: How Multimodality Improves Image Super-Resolution",
    "作者": "Kangfu Mei, Hossein Talebi, Mojtaba Ardakani, Vishal M. Patel, Peyman Milanfar, Mauricio Delbracio",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Mei_The_Power_of_Context_How_Multimodality_Improves_Image_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Mei_The_Power_of_Context_How_Multimodality_Improves_Image_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "SAM-REF: Introducing Image-Prompt Synergy during Interaction for Detail Enhancement in the Segment Anything Model",
    "作者": "Chongkai Yu, Ting Liu, Anqi Li, Xiaochao Qu, Chengjing Wu, Luoqi Liu, Xiaolin Hu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Yu_SAM-REF_Introducing_Image-Prompt_Synergy_during_Interaction_for_Detail_Enhancement_in_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Yu_SAM-REF_Introducing_Image-Prompt_Synergy_during_Interaction_for_Detail_Enhancement_in_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Reversing Flow for Image Restoration",
    "作者": "Haina Qin, Wenyang Luo, Libin Wang, Dandan Zheng, Jingdong Chen, Ming Yang, Bing Li, Weiming Hu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Qin_Reversing_Flow_for_Image_Restoration_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Qin_Reversing_Flow_for_Image_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Evolving High-Quality Rendering and Reconstruction in a Unified Framework with Contribution-Adaptive Regularization",
    "作者": "You Shen, Zhipeng Zhang, Xinyang Li, Yansong Qu, Yu Lin, Shengchuan Zhang, Liujuan Cao",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Shen_Evolving_High-Quality_Rendering_and_Reconstruction_in_a_Unified_Framework_with_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Shen_Evolving_High-Quality_Rendering_and_Reconstruction_in_a_Unified_Framework_with_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Noise Calibration and Spatial-Frequency Interactive Network for STEM Image Enhancement",
    "作者": "Hesong Li, Ziqi Wu, Ruiwen Shao, Tao Zhang, Ying Fu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Li_Noise_Calibration_and_Spatial-Frequency_Interactive_Network_for_STEM_Image_Enhancement_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/HeasonLee/SFIN",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Li_Noise_Calibration_and_Spatial-Frequency_Interactive_Network_for_STEM_Image_Enhancement_CVPR_2025_paper.pdf"
  },
  {
    "标题": "HIIF: Hierarchical Encoding based Implicit Image Function for Continuous Super-resolution",
    "作者": "Yuxuan Jiang, Ho Man Kwan, Tianhao Peng, Ge Gao, Fan Zhang, Xiaoqing Zhu, Joel Sole, David Bull",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Jiang_HIIF_Hierarchical_Encoding_based_Implicit_Image_Function_for_Continuous_Super-resolution_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Jiang_HIIF_Hierarchical_Encoding_based_Implicit_Image_Function_for_Continuous_Super-resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "ArtiFade: Learning to Generate High-quality Subject from Blemished Images",
    "作者": "Shuya Yang, Shaozhe Hao, Yukang Cao, Kwan-Yee K. Wong",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Yang_ArtiFade_Learning_to_Generate_High-quality_Subject_from_Blemished_Images_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Yang_ArtiFade_Learning_to_Generate_High-quality_Subject_from_Blemished_Images_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Frequency Dynamic Convolution for Dense Image Prediction",
    "作者": "Linwei Chen, Lin Gu, Liang Li, Chenggang Yan, Ying Fu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Chen_Frequency_Dynamic_Convolution_for_Dense_Image_Prediction_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Chen_Frequency_Dynamic_Convolution_for_Dense_Image_Prediction_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Visual-Instructed Degradation Diffusion for All-in-One Image Restoration",
    "作者": "Wenyang Luo, Haina Qin, Zewen Chen, Libin Wang, Dandan Zheng, Yuming Li, Yufan Liu, Bing Li, Weiming Hu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Luo_Visual-Instructed_Degradation_Diffusion_for_All-in-One_Image_Restoration_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Luo_Visual-Instructed_Degradation_Diffusion_for_All-in-One_Image_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "OSDFace: One-Step Diffusion Model for Face Restoration",
    "作者": "Jingkai Wang, Jue Gong, Lin Zhang, Zheng Chen, Xing Liu, Hong Gu, Yutong Liu, Yulun Zhang, Xiaokang Yang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Wang_OSDFace_One-Step_Diffusion_Model_for_Face_Restoration_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/jkwang28/OSDFace",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_OSDFace_One-Step_Diffusion_Model_for_Face_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Hazy Low-Quality Satellite Video Restoration Via Learning Optimal Joint Degradation Patterns and Continuous-Scale Super-Resolution Reconstruction",
    "作者": "Ning Ni, Libao Zhang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Ni_Hazy_Low-Quality_Satellite_Video_Restoration_Via_Learning_Optimal_Joint_Degradation_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Ni_Hazy_Low-Quality_Satellite_Video_Restoration_Via_Learning_Optimal_Joint_Degradation_CVPR_2025_paper.pdf"
  },
  {
    "标题": "MambaIRv2: Attentive State Space Restoration",
    "作者": "Hang Guo, Yong Guo, Yaohua Zha, Yulun Zhang, Wenbo Li, Tao Dai, Shu-Tao Xia, Yawei Li",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Guo_MambaIRv2_Attentive_State_Space_Restoration_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/csguoh/MambaIR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Guo_MambaIRv2_Attentive_State_Space_Restoration_CVPR_2025_paper.pdf"
  },
  {
    "标题": "LP-Diff: Towards Improved Restoration of Real-World Degraded License Plate",
    "作者": "Haoyan Gong, Zhenrong Zhang, Yuzheng Feng, Anh Nguyen, Hongbin Liu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Gong_LP-Diff_Towards_Improved_Restoration_of_Real-World_Degraded_License_Plate_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/haoyGONG/LP-Diff",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Gong_LP-Diff_Towards_Improved_Restoration_of_Real-World_Degraded_License_Plate_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Making Old Film Great Again: Degradation-aware State Space Model for Old Film Restoration",
    "作者": "Yudong Mao, Hao Luo, Zhiwei Zhong, Peilin Chen, Zhijiang Zhang, Shiqi Wang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Mao_Making_Old_Film_Great_Again_Degradation-aware_State_Space_Model_for_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/MaoAYD/MambaOFR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Mao_Making_Old_Film_Great_Again_Degradation-aware_State_Space_Model_for_CVPR_2025_paper.pdf"
  },
  {
    "标题": "PatchVSR: Breaking Video Diffusion Resolution Limits with Patch-wise Video Super-Resolution",
    "作者": "Shian Du, Menghan Xia, Chang Liu, Xintao Wang, Jing Wang, Pengfei Wan, Di Zhang, Xiangyang Ji",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Du_PatchVSR_Breaking_Video_Diffusion_Resolution_Limits_with_Patch-wise_Video_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Du_PatchVSR_Breaking_Video_Diffusion_Resolution_Limits_with_Patch-wise_Video_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Event-based Video Super-Resolution via State Space Models",
    "作者": "Zeyu Xiao, Xinchao Wang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Xiao_Event-based_Video_Super-Resolution_via_State_Space_Models_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Xiao_Event-based_Video_Super-Resolution_via_State_Space_Models_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Pixel-level and Semantic-level Adjustable Super-resolution: A Dual-LoRA Approach",
    "作者": "Lingchen Sun, Rongyuan Wu, Zhiyuan Ma, Shuaizheng Liu, Qiaosi Yi, Lei Zhang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Sun_Pixel-level_and_Semantic-level_Adjustable_Super-resolution_A_Dual-LoRA_Approach_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/csslc/PiSA-SR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Sun_Pixel-level_and_Semantic-level_Adjustable_Super-resolution_A_Dual-LoRA_Approach_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Self-supervised ControlNet with Spatio-Temporal Mamba for Real-world Video Super-resolution",
    "作者": "Shijun Shi, Jing Xu, Lijing Lu, Zhihang Li, Kai Hu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Shi_Self-supervised_ControlNet_with_Spatio-Temporal_Mamba_for_Real-world_Video_Super-resolution_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Shi_Self-supervised_ControlNet_with_Spatio-Temporal_Mamba_for_Real-world_Video_Super-resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "EvEnhancer: Empowering Effectiveness, Efficiency and Generalizability for Continuous Space-Time Video Super-Resolution with Events",
    "作者": "Shuoyan Wei, Feng Li, Shengeng Tang, Yao Zhao, Huihui Bai",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Wei_EvEnhancer_Empowering_Effectiveness_Efficiency_and_Generalizability_for_Continuous_Space-Time_Video_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Wei_EvEnhancer_Empowering_Effectiveness_Efficiency_and_Generalizability_for_Continuous_Space-Time_Video_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Edge-SD-SR: Low Latency and Parameter Efficient On-device Super-Resolution with Stable Diffusion via Bidirectional Conditioning",
    "作者": "Isma Hadji, Mehdi Noroozi, Victor Escorcia, Anestis Zaganidis, Brais Martinez, Georgios Tzimiropoulos",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Hadji_Edge-SD-SR_Low_Latency_and_Parameter_Efficient_On-device_Super-Resolution_with_Stable_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Hadji_Edge-SD-SR_Low_Latency_and_Parameter_Efficient_On-device_Super-Resolution_with_Stable_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Volume Tells: Dual Cycle-Consistent Diffusion for 3D Fluorescence Microscopy De-noising and Super-Resolution",
    "作者": "Zelin Li, Chenwei Wang, Zhaoke Huang, Yiming Ma, Cunming Zhao, Zhongying Zhao, Hong Yan",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Li_Volume_Tells_Dual_Cycle-Consistent_Diffusion_for_3D_Fluorescence_Microscopy_De-noising_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Li_Volume_Tells_Dual_Cycle-Consistent_Diffusion_for_3D_Fluorescence_Microscopy_De-noising_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Spk2SRImgNet: Super-Resolve Dynamic Scene from Spike Stream via Motion Aligned Collaborative Filtering",
    "作者": "Yuanlin Wang, Yiyang Zhang, Ruiqin Xiong, Jing Zhao, Jian Zhang, Xiaopeng Fan, Tiejun Huang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Wang_Spk2SRImgNet_Super-Resolve_Dynamic_Scene_from_Spike_Stream_via_Motion_Aligned_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_Spk2SRImgNet_Super-Resolve_Dynamic_Scene_from_Spike_Stream_via_Motion_Aligned_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Decoupling Fine Detail and Global Geometry for Compressed Depth Map Super-Resolution",
    "作者": "Huan Zheng, Wencheng Han, Jianbing Shen",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zheng_Decoupling_Fine_Detail_and_Global_Geometry_for_Compressed_Depth_Map_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/Ian0926/GDNet",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zheng_Decoupling_Fine_Detail_and_Global_Geometry_for_Compressed_Depth_Map_CVPR_2025_paper.pdf"
  },
  {
    "标题": "VideoGigaGAN: Towards Detail-rich Video Super-Resolution",
    "作者": "Yiran Xu, Taesung Park, Richard Zhang, Yang Zhou, Eli Shechtman, Feng Liu, Jia-Bin Huang, Difan Liu",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Xu_VideoGigaGAN_Towards_Detail-rich_Video_Super-Resolution_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/open-mmlab/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Xu_VideoGigaGAN_Towards_Detail-rich_Video_Super-Resolution_CVPR_2025_paper.pdf"
  },
  {
    "标题": "DORNet: A Degradation Oriented and Regularized Network for Blind Depth Super-Resolution",
    "作者": "Zhengxue Wang, Zhiqiang Yan, Jinshan Pan, Guangwei Gao, Kai Zhang, Jian Yang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Wang_DORNet_A_Degradation_Oriented_and_Regularized_Network_for_Blind_Depth_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_DORNet_A_Degradation_Oriented_and_Regularized_Network_for_Blind_Depth_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Efficient Video Super-Resolution for Real-time Rendering with Decoupled G-buffer Guidance",
    "作者": "Mingjun Zheng, Long Sun, Jiangxin Dong, Jinshan Pan",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Zheng_Efficient_Video_Super-Resolution_for_Real-time_Rendering_with_Decoupled_G-buffer_Guidance_CVPR_2025_paper.html",
    "代码仓库": "https://github.com/sunny2109/RDG",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Zheng_Efficient_Video_Super-Resolution_for_Real-time_Rendering_with_Decoupled_G-buffer_Guidance_CVPR_2025_paper.pdf"
  },
  {
    "标题": "SLVR: Super-Light Visual Reconstruction via Blueprint Controllable Convolutions and Exploring Feature Diversity Representation",
    "作者": "Ning Ni, Libao Zhang",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Ni_SLVR_Super-Light_Visual_Reconstruction_via_Blueprint_Controllable_Convolutions_and_Exploring_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Ni_SLVR_Super-Light_Visual_Reconstruction_via_Blueprint_Controllable_Convolutions_and_Exploring_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Efficient Video Face Enhancement with Enhanced Spatial-Temporal Consistency",
    "作者": "Yutong Wang, Jiajie Teng, Jiajiong Cao, Yuming Li, Chenguang Ma, Hongteng Xu, Dixin Luo",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Wang_Efficient_Video_Face_Enhancement_with_Enhanced_Spatial-Temporal_Consistency_CVPR_2025_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "UHD Video Restoration",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_Efficient_Video_Face_Enhancement_with_Enhanced_Spatial-Temporal_Consistency_CVPR_2025_paper.pdf"
  },
  {
    "标题": "U-Know-DiffPAN: An Uncertainty-aware Knowledge Distillation Diffusion Framework with Details Enhancement for PAN-Sharpening",
    "作者": "Sungpyo Kim, Jeonghyeok Do, Jaehyup Lee, Munchurl Kim",
    "时间": "2025",
    "发表于": "CVPR2025",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2025/html/Kim_U-Know-DiffPAN_An_Uncertainty-aware_Knowledge_Distillation_Diffusion_Framework_with_Details_Enhancement_CVPR_2025_paper.html",
    "代码仓库": "https://kaist-viclab.github.io/U-",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "8K Video Enhancement",
    "会议": "CVPR2025",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2025/papers/Kim_U-Know-DiffPAN_An_Uncertainty-aware_Knowledge_Distillation_Diffusion_Framework_with_Details_Enhancement_CVPR_2025_paper.pdf"
  },
  {
    "标题": "Continuous Optical Zooming: A Benchmark for Arbitrary-Scale Image Super-Resolution in Real World",
    "作者": "Huiyuan Fu, Fei Peng, Xianwei Li, Yejun Li, Xin Wang, Huadong Ma",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Fu_Continuous_Optical_Zooming_A_Benchmark_for_Arbitrary-Scale_Image_Super-Resolution_in_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/pf0607/COZ",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Fu_Continuous_Optical_Zooming_A_Benchmark_for_Arbitrary-Scale_Image_Super-Resolution_in_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Boosting Image Restoration via Priors from Pre-trained Models",
    "作者": "Xiaogang Xu, Shu Kong, Tao Hu, Zhe Liu, Hujun Bao",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Xu_Boosting_Image_Restoration_via_Priors_from_Pre-trained_Models_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Xu_Boosting_Image_Restoration_via_Priors_from_Pre-trained_Models_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Arbitrary-Scale Image Generation and Upsampling using Latent Diffusion Model and Implicit Neural Decoder",
    "作者": "Jinseok Kim, Tae-Kyun Kim",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Kim_Arbitrary-Scale_Image_Generation_and_Upsampling_using_Latent_Diffusion_Model_and_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Kim_Arbitrary-Scale_Image_Generation_and_Upsampling_using_Latent_Diffusion_Model_and_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Multimodal Prompt Perceiver: Empower Adaptiveness Generalizability and Fidelity for All-in-One Image Restoration",
    "作者": "Yuang Ai, Huaibo Huang, Xiaoqiang Zhou, Jiexiang Wang, Ran He",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Ai_Multimodal_Prompt_Perceiver_Empower_Adaptiveness_Generalizability_and_Fidelity_for_All-in-One_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Ai_Multimodal_Prompt_Perceiver_Empower_Adaptiveness_Generalizability_and_Fidelity_for_All-in-One_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Adapt or Perish: Adaptive Sparse Transformer with Attentive Feature Refinement for Image Restoration",
    "作者": "Shihao Zhou, Duosheng Chen, Jinshan Pan, Jinglei Shi, Jufeng Yang",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Zhou_Adapt_or_Perish_Adaptive_Sparse_Transformer_with_Attentive_Feature_Refinement_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/joshyZhou/AST",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zhou_Adapt_or_Perish_Adaptive_Sparse_Transformer_with_Attentive_Feature_Refinement_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Distilling Semantic Priors from SAM to Efficient Image Restoration Models",
    "作者": "Quan Zhang, Xiaoyu Liu, Wei Li, Hanting Chen, Junchao Liu, Jie Hu, Zhiwei Xiong, Chun Yuan, Yunhe Wang",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Zhang_Distilling_Semantic_Priors_from_SAM_to_Efficient_Image_Restoration_Models_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zhang_Distilling_Semantic_Priors_from_SAM_to_Efficient_Image_Restoration_Models_CVPR_2024_paper.pdf"
  },
  {
    "标题": "A Dynamic Kernel Prior Model for Unsupervised Blind Image Super-Resolution",
    "作者": "Zhixiong Yang, Jingyuan Xia, Shengxi Li, Xinghua Huang, Shuanghui Zhang, Zhen Liu, Yaowen Fu, Yongxiang Liu",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Yang_A_Dynamic_Kernel_Prior_Model_for_Unsupervised_Blind_Image_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Yang_A_Dynamic_Kernel_Prior_Model_for_Unsupervised_Blind_Image_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "SinSR: Diffusion-Based Image Super-Resolution in a Single Step",
    "作者": "Yufei Wang, Wenhan Yang, Xinyuan Chen, Yaohui Wang, Lanqing Guo, Lap-Pui Chau, Ziwei Liu, Yu Qiao, Alex C. Kot, Bihan Wen",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Wang_SinSR_Diffusion-Based_Image_Super-Resolution_in_a_Single_Step_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/wyf0912/SinSR/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Wang_SinSR_Diffusion-Based_Image_Super-Resolution_in_a_Single_Step_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Image Restoration by Denoising Diffusion Models with Iteratively Preconditioned Guidance",
    "作者": "Tomer Garber, Tom Tirer",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Garber_Image_Restoration_by_Denoising_Diffusion_Models_with_Iteratively_Preconditioned_Guidance_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Garber_Image_Restoration_by_Denoising_Diffusion_Models_with_Iteratively_Preconditioned_Guidance_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Text-guided Explorable Image Super-resolution",
    "作者": "Kanchana Vaishnavi Gandikota, Paramanand Chandramouli",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Gandikota_Text-guided_Explorable_Image_Super-resolution_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/KVGandikota/Text-",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Gandikota_Text-guided_Explorable_Image_Super-resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Beyond Image Super-Resolution for Image Recognition with Task-Driven Perceptual Loss",
    "作者": "Jaeha Kim, Junghun Oh, Kyoung Mu Lee",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Kim_Beyond_Image_Super-Resolution_for_Image_Recognition_with_Task-Driven_Perceptual_Loss_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/JaehaKim97/SR4IR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Kim_Beyond_Image_Super-Resolution_for_Image_Recognition_with_Task-Driven_Perceptual_Loss_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Learning Diffusion Texture Priors for Image Restoration",
    "作者": "Tian Ye, Sixiang Chen, Wenhao Chai, Zhaohu Xing, Jing Qin, Ge Lin, Lei Zhu",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Ye_Learning_Diffusion_Texture_Priors_for_Image_Restoration_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Ye_Learning_Diffusion_Texture_Priors_for_Image_Restoration_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Training Generative Image Super-Resolution Models by Wavelet-Domain Losses Enables Better Control of Artifacts",
    "作者": "Cansu Korkmaz, A. Murat Tekalp, Zafer Dogan",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Korkmaz_Training_Generative_Image_Super-Resolution_Models_by_Wavelet-Domain_Losses_Enables_Better_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/mandalinadagi/WGSR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Korkmaz_Training_Generative_Image_Super-Resolution_Models_by_Wavelet-Domain_Losses_Enables_Better_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Empowering Resampling Operation for Ultra-High-Definition Image Enhancement with Model-Aware Guidance",
    "作者": "Wei Yu, Jie Huang, Bing Li, Kaiwen Zheng, Qi Zhu, Man Zhou, Feng Zhao",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Yu_Empowering_Resampling_Operation_for_Ultra-High-Definition_Image_Enhancement_with_Model-Aware_Guidance_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/YPatrickW/LMAR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Yu_Empowering_Resampling_Operation_for_Ultra-High-Definition_Image_Enhancement_with_Model-Aware_Guidance_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Learning Coupled Dictionaries from Unpaired Data for Image Super-Resolution",
    "作者": "Longguang Wang, Juncheng Li, Yingqian Wang, Qingyong Hu, Yulan Guo",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Wang_Learning_Coupled_Dictionaries_from_Unpaired_Data_for_Image_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Wang_Learning_Coupled_Dictionaries_from_Unpaired_Data_for_Image_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Scaling Up to Excellence: Practicing Model Scaling for Photo-Realistic Image Restoration In the Wild",
    "作者": "Fanghua Yu, Jinjin Gu, Zheyuan Li, Jinfan Hu, Xiangtao Kong, Xintao Wang, Jingwen He, Yu Qiao, Chao Dong",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Yu_Scaling_Up_to_Excellence_Practicing_Model_Scaling_for_Photo-Realistic_Image_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Yu_Scaling_Up_to_Excellence_Practicing_Model_Scaling_for_Photo-Realistic_Image_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Selective Hourglass Mapping for Universal Image Restoration Based on Diffusion Model",
    "作者": "Dian Zheng, Xiao-Ming Wu, Shuzhou Yang, Jian Zhang, Jian-Fang Hu, Wei-Shi Zheng",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Zheng_Selective_Hourglass_Mapping_for_Universal_Image_Restoration_Based_on_Diffusion_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/iSEE-Laboratory/DiffUIR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zheng_Selective_Hourglass_Mapping_for_Universal_Image_Restoration_Based_on_Diffusion_CVPR_2024_paper.pdf"
  },
  {
    "标题": "SeeSR: Towards Semantics-Aware Real-World Image Super-Resolution",
    "作者": "Rongyuan Wu, Tao Yang, Lingchen Sun, Zhengqiang Zhang, Shuai Li, Lei Zhang",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Wu_SeeSR_Towards_Semantics-Aware_Real-World_Image_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/cswry/SeeSR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Wu_SeeSR_Towards_Semantics-Aware_Real-World_Image_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Diffusion-based Blind Text Image Super-Resolution",
    "作者": "Yuzhe Zhang, Jiawei Zhang, Hao Li, Zhouxia Wang, Luwei Hou, Dongqing Zou, Liheng Bian",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Zhang_Diffusion-based_Blind_Text_Image_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zhang_Diffusion-based_Blind_Text_Image_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "SeD: Semantic-Aware Discriminator for Image Super-Resolution",
    "作者": "Bingchen Li, Xin Li, Hanxin Zhu, Yeying Jin, Ruoyu Feng, Zhizheng Zhang, Zhibo Chen",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Li_SeD_Semantic-Aware_Discriminator_for_Image_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Li_SeD_Semantic-Aware_Discriminator_for_Image_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "CDFormer: When Degradation Prediction Embraces Diffusion Model for Blind Image Super-Resolution",
    "作者": "Qingguo Liu, Chenyi Zhuang, Pan Gao, Jie Qin",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Liu_CDFormer_When_Degradation_Prediction_Embraces_Diffusion_Model_for_Blind_Image_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/I2-Multimedia-Lab/CDFormer",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Liu_CDFormer_When_Degradation_Prediction_Embraces_Diffusion_Model_for_Blind_Image_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Image Neural Field Diffusion Models",
    "作者": "Yinbo Chen, Oliver Wang, Richard Zhang, Eli Shechtman, Xiaolong Wang, Michael Gharbi",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Chen_Image_Neural_Field_Diffusion_Models_CVPR_2024_paper.html",
    "代码仓库": "https://yinboc.github.io/infd/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Chen_Image_Neural_Field_Diffusion_Models_CVPR_2024_paper.pdf"
  },
  {
    "标题": "SPECAT: SPatial-spEctral Cumulative-Attention Transformer for High-Resolution Hyperspectral Image Reconstruction",
    "作者": "Zhiyang Yao, Shuyang Liu, Xiaoyun Yuan, Lu Fang",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Yao_SPECAT_SPatial-spEctral_Cumulative-Attention_Transformer_for_High-Resolution_Hyperspectral_Image_Reconstruction_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/THU-luvision/SPECAT",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Yao_SPECAT_SPatial-spEctral_Cumulative-Attention_Transformer_for_High-Resolution_Hyperspectral_Image_Reconstruction_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Image Processing GNN: Breaking Rigidity in Super-Resolution",
    "作者": "Yuchuan Tian, Hanting Chen, Chao Xu, Yunhe Wang",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Tian_Image_Processing_GNN_Breaking_Rigidity_in_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Tian_Image_Processing_GNN_Breaking_Rigidity_in_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "CoSeR: Bridging Image and Language for Cognitive Super-Resolution",
    "作者": "Haoze Sun, Wenbo Li, Jianzhuang Liu, Haoyu Chen, Renjing Pei, Xueyi Zou, Youliang Yan, Yujiu Yang",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Sun_CoSeR_Bridging_Image_and_Language_for_Cognitive_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "https://huggingface.co/stabilityai/stable-diffusion-2-1-base",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Sun_CoSeR_Bridging_Image_and_Language_for_Cognitive_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "AdaBM: On-the-Fly Adaptive Bit Mapping for Image Super-Resolution",
    "作者": "Cheeun Hong, Kyoung Mu Lee",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Hong_AdaBM_On-the-Fly_Adaptive_Bit_Mapping_for_Image_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/Cheeun/AdaBM",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Hong_AdaBM_On-the-Fly_Adaptive_Bit_Mapping_for_Image_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Navigating Beyond Dropout: An Intriguing Solution towards Generalizable Image Super Resolution",
    "作者": "Hongjun Wang, Jiyuan Chen, Yinqiang Zheng, Tieyong Zeng",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Wang_Navigating_Beyond_Dropout_An_Intriguing_Solution_towards_Generalizable_Image_Super_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/Dreamzz5/Simple-Align",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Wang_Navigating_Beyond_Dropout_An_Intriguing_Solution_towards_Generalizable_Image_Super_CVPR_2024_paper.pdf"
  },
  {
    "标题": "CoDe: An Explicit Content Decoupling Framework for Image Restoration",
    "作者": "Enxuan Gu, Hongwei Ge, Yong Guo",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Gu_CoDe_An_Explicit_Content_Decoupling_Framework_for_Image_Restoration_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Gu_CoDe_An_Explicit_Content_Decoupling_Framework_for_Image_Restoration_CVPR_2024_paper.pdf"
  },
  {
    "标题": "DocRes: A Generalist Model Toward Unifying Document Image Restoration Tasks",
    "作者": "Jiaxin Zhang, Dezhi Peng, Chongyu Liu, Peirong Zhang, Lianwen Jin",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Zhang_DocRes_A_Generalist_Model_Toward_Unifying_Document_Image_Restoration_Tasks_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/ZZZHANG-",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zhang_DocRes_A_Generalist_Model_Toward_Unifying_Document_Image_Restoration_Tasks_CVPR_2024_paper.pdf"
  },
  {
    "标题": "CFAT: Unleashing Triangular Windows for Image Super-resolution",
    "作者": "Abhisek Ray, Gaurav Kumar, Maheshkumar H. Kolekar",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Ray_CFAT_Unleashing_Triangular_Windows_for_Image_Super-resolution_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Ray_CFAT_Unleashing_Triangular_Windows_for_Image_Super-resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Equivariant Plug-and-Play Image Reconstruction",
    "作者": "Matthieu Terris, Thomas Moreau, Nelly Pustelnik, Julian Tachella",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Terris_Equivariant_Plug-and-Play_Image_Reconstruction_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/matthieutrs/EquivariantPnP",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Terris_Equivariant_Plug-and-Play_Image_Reconstruction_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Learning Large-Factor EM Image Super-Resolution with Generative Priors",
    "作者": "Jiateng Shou, Zeyu Xiao, Shiyu Deng, Wei Huang, Peiyao Shi, Ruobing Zhang, Zhiwei Xiong, Feng Wu",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Shou_Learning_Large-Factor_EM_Image_Super-Resolution_with_Generative_Priors_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/jtshou/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Shou_Learning_Large-Factor_EM_Image_Super-Resolution_with_Generative_Priors_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Uncertainty-Aware Source-Free Adaptive Image Super-Resolution with Wavelet Augmentation Transformer",
    "作者": "Yuang Ai, Xiaoqiang Zhou, Huaibo Huang, Lei Zhang, Ran He",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Ai_Uncertainty-Aware_Source-Free_Adaptive_Image_Super-Resolution_with_Wavelet_Augmentation_Transformer_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Ai_Uncertainty-Aware_Source-Free_Adaptive_Image_Super-Resolution_with_Wavelet_Augmentation_Transformer_CVPR_2024_paper.pdf"
  },
  {
    "标题": "PFStorer: Personalized Face Restoration and Super-Resolution",
    "作者": "Tuomas Varanka, Tapani Toivonen, Soumya Tripathy, Guoying Zhao, Erman Acar",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Varanka_PFStorer_Personalized_Face_Restoration_and_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Varanka_PFStorer_Personalized_Face_Restoration_and_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "MR-VNet: Media Restoration using Volterra Networks",
    "作者": "Siddharth Roheda, Amit Unde, Loay Rashid",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Roheda_MR-VNet_Media_Restoration_using_Volterra_Networks_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Roheda_MR-VNet_Media_Restoration_using_Volterra_Networks_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Restoration by Generation with Constrained Priors",
    "作者": "Zheng Ding, Xuaner Zhang, Zhuowen Tu, Zhihao Xia",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Ding_Restoration_by_Generation_with_Constrained_Priors_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Ding_Restoration_by_Generation_with_Constrained_Priors_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Learning Degradation-unaware Representation with Prior-based Latent Transformations for Blind Face Restoration",
    "作者": "Lianxin Xie, Csbingbing Zheng, Wen Xue, Le Jiang, Cheng Liu, Si Wu, Hau San Wong",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Xie_Learning_Degradation-unaware_Representation_with_Prior-based_Latent_Transformations_for_Blind_Face_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Xie_Learning_Degradation-unaware_Representation_with_Prior-based_Latent_Transformations_for_Blind_Face_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Deep Equilibrium Diffusion Restoration with Parallel Sampling",
    "作者": "Jiezhang Cao, Yue Shi, Kai Zhang, Yulun Zhang, Radu Timofte, Luc Van Gool",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Cao_Deep_Equilibrium_Diffusion_Restoration_with_Parallel_Sampling_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/caojiezhang/DeqIR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Cao_Deep_Equilibrium_Diffusion_Restoration_with_Parallel_Sampling_CVPR_2024_paper.pdf"
  },
  {
    "标题": "WaveFace: Authentic Face Restoration with Efficient Frequency Recovery",
    "作者": "Yunqi Miao, Jiankang Deng, Jungong Han",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Miao_WaveFace_Authentic_Face_Restoration_with_Efficient_Frequency_Recovery_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Miao_WaveFace_Authentic_Face_Restoration_with_Efficient_Frequency_Recovery_CVPR_2024_paper.pdf"
  },
  {
    "标题": "CycleINR: Cycle Implicit Neural Representation for Arbitrary-Scale Volumetric Super-Resolution of Medical Data",
    "作者": "Wei Fang, Yuxing Tang, Heng Guo, Mingze Yuan, Tony C. W. Mok, Ke Yan, Jiawen Yao, Xin Chen, Zaiyi Liu, Le Lu, Ling Zhang, Minfeng Xu",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Fang_CycleINR_Cycle_Implicit_Neural_Representation_for_Arbitrary-Scale_Volumetric_Super-Resolution_of_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Fang_CycleINR_Cycle_Implicit_Neural_Representation_for_Arbitrary-Scale_Volumetric_Super-Resolution_of_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Enhancing Video Super-Resolution via Implicit Resampling-based Alignment",
    "作者": "Kai Xu, Ziwei Yu, Xin Wang, Michael Bi Mi, Angela Yao",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Xu_Enhancing_Video_Super-Resolution_via_Implicit_Resampling-based_Alignment_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Xu_Enhancing_Video_Super-Resolution_via_Implicit_Resampling-based_Alignment_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Learning Spatial Adaptation and Temporal Coherence in Diffusion Models for Video Super-Resolution",
    "作者": "Zhikai Chen, Fuchen Long, Zhaofan Qiu, Ting Yao, Wengang Zhou, Jiebo Luo, Tao Mei",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Chen_Learning_Spatial_Adaptation_and_Temporal_Coherence_in_Diffusion_Models_for_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Chen_Learning_Spatial_Adaptation_and_Temporal_Coherence_in_Diffusion_Models_for_CVPR_2024_paper.pdf"
  },
  {
    "标题": "APISR: Anime Production Inspired Real-World Anime Super-Resolution",
    "作者": "Boyang Wang, Fengyu Yang, Xihang Yu, Chao Zhang, Hanbin Zhao",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Wang_APISR_Anime_Production_Inspired_Real-World_Anime_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/Kiteretsu77/APISR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Wang_APISR_Anime_Production_Inspired_Real-World_Anime_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "DiSR-NeRF: Diffusion-Guided View-Consistent Super-Resolution NeRF",
    "作者": "Jie Long Lee, Chen Li, Gim Hee Lee",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Lee_DiSR-NeRF_Diffusion-Guided_View-Consistent_Super-Resolution_NeRF_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/leejielong/DiSR-NeRF",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Lee_DiSR-NeRF_Diffusion-Guided_View-Consistent_Super-Resolution_NeRF_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Low-Res Leads the Way: Improving Generalization for Super-Resolution by Self-Supervised Learning",
    "作者": "Haoyu Chen, Wenbo Li, Jinjin Gu, Jingjing Ren, Haoze Sun, Xueyi Zou, Zhensong Zhang, Youliang Yan, Lei Zhu",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Chen_Low-Res_Leads_the_Way_Improving_Generalization_for_Super-Resolution_by_Self-Supervised_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Chen_Low-Res_Leads_the_Way_Improving_Generalization_for_Super-Resolution_by_Self-Supervised_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Super-Resolution Reconstruction from Bayer-Pattern Spike Streams",
    "作者": "Yanchen Dong, Ruiqin Xiong, Jian Zhang, Zhaofei Yu, Xiaopeng Fan, Shuyuan Zhu, Tiejun Huang",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Dong_Super-Resolution_Reconstruction_from_Bayer-Pattern_Spike_Streams_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/csycdong/CSCSR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Dong_Super-Resolution_Reconstruction_from_Bayer-Pattern_Spike_Streams_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Rethinking Diffusion Model for Multi-Contrast MRI Super-Resolution",
    "作者": "Guangyuan Li, Chen Rao, Juncheng Mo, Zhanjie Zhang, Wei Xing, Lei Zhao",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Li_Rethinking_Diffusion_Model_for_Multi-Contrast_MRI_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "Code: https://github.com/GuangYuanKK/DiffMSR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Li_Rethinking_Diffusion_Model_for_Multi-Contrast_MRI_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Video Super-Resolution Transformer with Masked Inter&Intra-Frame Attention",
    "作者": "Xingyu Zhou, Leheng Zhang, Xiaorui Zhao, Keze Wang, Leida Li, Shuhang Gu",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Zhou_Video_Super-Resolution_Transformer_with_Masked_InterIntra-Frame_Attention_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zhou_Video_Super-Resolution_Transformer_with_Masked_InterIntra-Frame_Attention_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Neural Super-Resolution for Real-time Rendering with Radiance Demodulation",
    "作者": "Jia Li, Ziling Chen, Xiaolong Wu, Lu Wang, Beibei Wang, Lei Zhang",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Li_Neural_Super-Resolution_for_Real-time_Rendering_with_Radiance_Demodulation_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/Riga2/NSRD",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Li_Neural_Super-Resolution_for_Real-time_Rendering_with_Radiance_Demodulation_CVPR_2024_paper.pdf"
  },
  {
    "标题": "FMA-Net: Flow-Guided Dynamic Filtering and Iterative Feature Refinement with Multi-Attention for Joint Video Super-Resolution and Deblurring",
    "作者": "Geunhyuk Youk, Jihyong Oh, Munchurl Kim",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Youk_FMA-Net_Flow-Guided_Dynamic_Filtering_and_Iterative_Feature_Refinement_with_Multi-Attention_CVPR_2024_paper.html",
    "代码仓库": "https://kaist-viclab.github.io/fmanet-",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Youk_FMA-Net_Flow-Guided_Dynamic_Filtering_and_Iterative_Feature_Refinement_with_Multi-Attention_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Boosting Flow-based Generative Super-Resolution Models via Learned Prior",
    "作者": "Li-Yuan Tsao, Yi-Chen Lo, Chia-Che Chang, Hao-Wei Chen, Roy Tseng, Chien Feng, Chun-Yi Lee",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Tsao_Boosting_Flow-based_Generative_Super-Resolution_Models_via_Learned_Prior_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Tsao_Boosting_Flow-based_Generative_Super-Resolution_Models_via_Learned_Prior_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Transcending the Limit of Local Window: Advanced Super-Resolution Transformer with Adaptive Token Dictionary",
    "作者": "Leheng Zhang, Yawei Li, Xingyu Zhou, Xiaorui Zhao, Shuhang Gu",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Zhang_Transcending_the_Limit_of_Local_Window_Advanced_Super-Resolution_Transformer_with_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/LabShuHangGU/Adaptive-Token-Dictionary",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zhang_Transcending_the_Limit_of_Local_Window_Advanced_Super-Resolution_Transformer_with_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Upscale-A-Video: Temporal-Consistent Diffusion Model for Real-World Video Super-Resolution",
    "作者": "Shangchen Zhou, Peiqing Yang, Jianyi Wang, Yihang Luo, Chen Change Loy",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Zhou_Upscale-A-Video_Temporal-Consistent_Diffusion_Model_for_Real-World_Video_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zhou_Upscale-A-Video_Temporal-Consistent_Diffusion_Model_for_Real-World_Video_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Self-Adaptive Reality-Guided Diffusion for Artifact-Free Super-Resolution",
    "作者": "Qingping Zheng, Ling Zheng, Yuanfan Guo, Ying Li, Songcen Xu, Jiankang Deng, Hang Xu",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Zheng_Self-Adaptive_Reality-Guided_Diffusion_for_Artifact-Free_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/ProAirVerse/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zheng_Self-Adaptive_Reality-Guided_Diffusion_for_Artifact-Free_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Universal Robustness via Median Randomized Smoothing for Real-World Super-Resolution",
    "作者": "Zakariya Chaouai, Mohamed Tamaazousti",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Chaouai_Universal_Robustness_via_Median_Randomized_Smoothing_for_Real-World_Super-Resolution_CVPR_2024_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Chaouai_Universal_Robustness_via_Median_Randomized_Smoothing_for_Real-World_Super-Resolution_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Building Bridges across Spatial and Temporal Resolutions: Reference-Based Super-Resolution via Change Priors and Conditional Diffusion Model",
    "作者": "Runmin Dong, Shuai Yuan, Bin Luo, Mengxuan Chen, Jinxiao Zhang, Lixian Zhang, Weijia Li, Juepeng Zheng, Haohuan Fu",
    "时间": "2024",
    "发表于": "CVPR2024",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2024/html/Dong_Building_Bridges_across_Spatial_and_Temporal_Resolutions_Reference-Based_Super-Resolution_via_CVPR_2024_paper.html",
    "代码仓库": "https://github.com/dongrunmin/RefDiff",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "CVPR2024",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/CVPR2024/papers/Dong_Building_Bridges_across_Spatial_and_Temporal_Resolutions_Reference-Based_Super-Resolution_via_CVPR_2024_paper.pdf"
  },
  {
    "标题": "Diff-Retinex: Rethinking Low-light Image Enhancement with A Generative Diffusion Model",
    "作者": "Xunpeng Yi, Han Xu, Hao Zhang, Linfeng Tang, Jiayi Ma",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Yi_Diff-Retinex_Rethinking_Low-light_Image_Enhancement_with_A_Generative_Diffusion_Model_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Yi_Diff-Retinex_Rethinking_Low-light_Image_Enhancement_with_A_Generative_Diffusion_Model_ICCV_2023_paper.pdf"
  },
  {
    "标题": "A Benchmark for Chinese-English Scene Text Image Super-Resolution",
    "作者": "Jianqi Ma, Zhetong Liang, Wangmeng Xiang, Xi Yang, Lei Zhang",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Ma_A_Benchmark_for_Chinese-English_Scene_Text_Image_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/mjq11302010044/Real-CE",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Ma_A_Benchmark_for_Chinese-English_Scene_Text_Image_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "HSR-Diff: Hyperspectral Image Super-Resolution via Conditional Diffusion Models",
    "作者": "Chanyue Wu, Dong Wang, Yunpeng Bai, Hanyu Mao, Ying Li, Qiang Shen",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Wu_HSR-Diff_Hyperspectral_Image_Super-Resolution_via_Conditional_Diffusion_Models_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Wu_HSR-Diff_Hyperspectral_Image_Super-Resolution_via_Conditional_Diffusion_Models_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Learning Image-Adaptive Codebooks for Class-Agnostic Image Restoration",
    "作者": "Kechun Liu, Yitong Jiang, Inchang Choi, Jinwei Gu",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Liu_Learning_Image-Adaptive_Codebooks_for_Class-Agnostic_Image_Restoration_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/kechunl/AdaCode",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Liu_Learning_Image-Adaptive_Codebooks_for_Class-Agnostic_Image_Restoration_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Dual Aggregation Transformer for Image Super-Resolution",
    "作者": "Zheng Chen, Yulun Zhang, Jinjin Gu, Linghe Kong, Xiaokang Yang, Fisher Yu",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Chen_Dual_Aggregation_Transformer_for_Image_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/zhengchen1999/DAT",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Chen_Dual_Aggregation_Transformer_for_Image_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Lightweight Image Super-Resolution with Superpixel Token Interaction",
    "作者": "Aiping Zhang, Wenqi Ren, Yi Liu, Xiaochun Cao",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhang_Lightweight_Image_Super-Resolution_with_Superpixel_Token_Interaction_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/ArcticHare105/SPIN",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Zhang_Lightweight_Image_Super-Resolution_with_Superpixel_Token_Interaction_ICCV_2023_paper.pdf"
  },
  {
    "标题": "MetaF2N: Blind Image Super-Resolution by Learning Efficient Model Adaptation from Faces",
    "作者": "Zhicun Yin, Ming Liu, Xiaoming Li, Hui Yang, Longan Xiao, Wangmeng Zuo",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Yin_MetaF2N_Blind_Image_Super-Resolution_by_Learning_Efficient_Model_Adaptation_from_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/yinzhicun/MetaF2N.1",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Yin_MetaF2N_Blind_Image_Super-Resolution_by_Learning_Efficient_Model_Adaptation_from_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Iterative Soft Shrinkage Learning for Efficient Image Super-Resolution",
    "作者": "Jiamian Wang, Huan Wang, Yulun Zhang, Yun Fu, Zhiqiang Tao",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Wang_Iterative_Soft_Shrinkage_Learning_for_Efficient_Image_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/Jiamian-Wang/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Wang_Iterative_Soft_Shrinkage_Learning_for_Efficient_Image_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Learning Non-Local Spatial-Angular Correlation for Light Field Image Super-Resolution",
    "作者": "Zhengyu Liang, Yingqian Wang, Longguang Wang, Jungang Yang, Shilin Zhou, Yulan Guo",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Liang_Learning_Non-Local_Spatial-Angular_Correlation_for_Light_Field_Image_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Liang_Learning_Non-Local_Spatial-Angular_Correlation_for_Light_Field_Image_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "FSI: Frequency and Spatial Interactive Learning for Image Restoration in Under-Display Cameras",
    "作者": "Chengxu Liu, Xuan Wang, Shuai Li, Yuzhi Wang, Xueming Qian",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Liu_FSI_Frequency_and_Spatial_Interactive_Learning_for_Image_Restoration_in_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Liu_FSI_Frequency_and_Spatial_Interactive_Learning_for_Image_Restoration_in_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Variational Degeneration to Structural Refinement: A Unified Framework for Superimposed Image Decomposition",
    "作者": "Wenyu Li, Yan Xu, Yang Yang, Haoran Ji, Yue Lang",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Li_Variational_Degeneration_to_Structural_Refinement_A_Unified_Framework_for_Superimposed_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/lwyﬁsh/V",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Li_Variational_Degeneration_to_Structural_Refinement_A_Unified_Framework_for_Superimposed_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Focal Network for Image Restoration",
    "作者": "Yuning Cui, Wenqi Ren, Xiaochun Cao, Alois Knoll",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Cui_Focal_Network_for_Image_Restoration_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/c-yn/FocalNet",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Cui_Focal_Network_for_Image_Restoration_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Feature Modulation Transformer: Cross-Refinement of Global Representation via High-Frequency Prior for Image Super-Resolution",
    "作者": "Ao Li, Le Zhang, Yun Liu, Ce Zhu",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Li_Feature_Modulation_Transformer_Cross-Refinement_of_Global_Representation_via_High-Frequency_Prior_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/AVC2-UESTC/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Li_Feature_Modulation_Transformer_Cross-Refinement_of_Global_Representation_via_High-Frequency_Prior_ICCV_2023_paper.pdf"
  },
  {
    "标题": "DDS2M: Self-Supervised Denoising Diffusion Spatio-Spectral Model for Hyperspectral Image Restoration",
    "作者": "Yuchun Miao, Lefei Zhang, Liangpei Zhang, Dacheng Tao",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Miao_DDS2M_Self-Supervised_Denoising_Diffusion_Spatio-Spectral_Model_for_Hyperspectral_Image_Restoration_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/miaoyuchun/DDS2M",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Miao_DDS2M_Self-Supervised_Denoising_Diffusion_Spatio-Spectral_Model_for_Hyperspectral_Image_Restoration_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Reconstructed Convolution Module Based Look-Up Tables for Efficient Image Super-Resolution",
    "作者": "Guandu Liu, Yukang Ding, Mading Li, Ming Sun, Xing Wen, Bin Wang",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Liu_Reconstructed_Convolution_Module_Based_Look-Up_Tables_for_Efficient_Image_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/liuguandu/RC-LUT",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Liu_Reconstructed_Convolution_Module_Based_Look-Up_Tables_for_Efficient_Image_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Boosting Single Image Super-Resolution via Partial Channel Shifting",
    "作者": "Xiaoming Zhang, Tianrui Li, Xiaole Zhao",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhang_Boosting_Single_Image_Super-Resolution_via_Partial_Channel_Shifting_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/OwXiaoM/PCS",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Zhang_Boosting_Single_Image_Super-Resolution_via_Partial_Channel_Shifting_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Learning Continuous Exposure Value Representations for Single-Image HDR Reconstruction",
    "作者": "Su-Kai Chen, Hung-Lin Yen, Yu-Lun Liu, Min-Hung Chen, Hou-Ning Hu, Wen-Hsiao Peng, Yen-Yu Lin",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Chen_Learning_Continuous_Exposure_Value_Representations_for_Single-Image_HDR_Reconstruction_ICCV_2023_paper.html",
    "代码仓库": "https://skchen1993.github.io/CEVR_web/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Chen_Learning_Continuous_Exposure_Value_Representations_for_Single-Image_HDR_Reconstruction_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Multiscale Structure Guided Diffusion for Image Deblurring",
    "作者": "Mengwei Ren, Mauricio Delbracio, Hossein Talebi, Guido Gerig, Peyman Milanfar",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Ren_Multiscale_Structure_Guided_Diffusion_for_Image_Deblurring_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Ren_Multiscale_Structure_Guided_Diffusion_for_Image_Deblurring_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Preface: A Data-driven Volumetric Prior for Few-shot Ultra High-resolution Face Synthesis",
    "作者": "Marcel C. Bühler, Kripasindhu Sarkar, Tanmay Shah, Gengyan Li, Daoye Wang, Leonhard Helminger, Sergio Orts-Escolano, Dmitry Lagun, Otmar Hilliges, Thabo Beeler, Abhimitra Meka",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Buhler_Preface_A_Data-driven_Volumetric_Prior_for_Few-shot_Ultra_High-resolution_Face_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Buhler_Preface_A_Data-driven_Volumetric_Prior_for_Few-shot_Ultra_High-resolution_Face_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Under-Display Camera Image Restoration with Scattering Effect",
    "作者": "Binbin Song, Xiangyu Chen, Shuning Xu, Jiantao Zhou",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Song_Under-Display_Camera_Image_Restoration_with_Scattering_Effect_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Song_Under-Display_Camera_Image_Restoration_with_Scattering_Effect_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Multi-Scale Residual Low-Pass Filter Network for Image Deblurring",
    "作者": "Jiangxin Dong, Jinshan Pan, Zhongbao Yang, Jinhui Tang",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Dong_Multi-Scale_Residual_Low-Pass_Filter_Network_for_Image_Deblurring_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Dong_Multi-Scale_Residual_Low-Pass_Filter_Network_for_Image_Deblurring_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Towards Real-World Burst Image Super-Resolution: Benchmark and Method",
    "作者": "Pengxu Wei, Yujing Sun, Xingbei Guo, Chang Liu, Guanbin Li, Jie Chen, Xiangyang Ji, Liang Lin",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Wei_Towards_Real-World_Burst_Image_Super-Resolution_Benchmark_and_Method_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/yjsunnn/FBANet",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Wei_Towards_Real-World_Burst_Image_Super-Resolution_Benchmark_and_Method_ICCV_2023_paper.pdf"
  },
  {
    "标题": "DiffIR: Efficient Diffusion Model for Image Restoration",
    "作者": "Bin Xia, Yulun Zhang, Shiyin Wang, Yitong Wang, Xinglong Wu, Yapeng Tian, Wenming Yang, Luc Van Gool",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Xia_DiffIR_Efficient_Diffusion_Model_for_Image_Restoration_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/Zj-BinXia/DiffIR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Xia_DiffIR_Efficient_Diffusion_Model_for_Image_Restoration_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Empowering Low-Light Image Enhancer through Customized Learnable Priors",
    "作者": "Naishan Zheng, Man Zhou, Yanmeng Dong, Xiangyu Rui, Jie Huang, Chongyi Li, Feng Zhao",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Zheng_Empowering_Low-Light_Image_Enhancer_through_Customized_Learnable_Priors_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/zheng980629/CUE",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Zheng_Empowering_Low-Light_Image_Enhancer_through_Customized_Learnable_Priors_ICCV_2023_paper.pdf"
  },
  {
    "标题": "The Devil is in the Upsampling: Architectural Decisions Made Simpler for Denoising with Deep Image Prior",
    "作者": "Yilin Liu, Jiang Li, Yunkui Pang, Dong Nie, Pew-Thian Yap",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Liu_The_Devil_is_in_the_Upsampling_Architectural_Decisions_Made_Simpler_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/YilinLiu97/FasterDIP-devil-in-upsampling.git",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Liu_The_Devil_is_in_the_Upsampling_Architectural_Decisions_Made_Simpler_ICCV_2023_paper.pdf"
  },
  {
    "标题": "CuNeRF: Cube-Based Neural Radiance Field for Zero-Shot Medical Image Arbitrary-Scale Super Resolution",
    "作者": "Zixuan Chen, Lingxiao Yang, Jian-Huang Lai, Xiaohua Xie",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Chen_CuNeRF_Cube-Based_Neural_Radiance_Field_for_Zero-Shot_Medical_Image_Arbitrary-Scale_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Chen_CuNeRF_Cube-Based_Neural_Radiance_Field_for_Zero-Shot_Medical_Image_Arbitrary-Scale_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Spatially-Adaptive Feature Modulation for Efficient Image Super-Resolution",
    "作者": "Long Sun, Jiangxin Dong, Jinhui Tang, Jinshan Pan",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Sun_Spatially-Adaptive_Feature_Modulation_for_Efficient_Image_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/sunny2109/SAFMN",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Sun_Spatially-Adaptive_Feature_Modulation_for_Efficient_Image_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "ESSAformer: Efficient Transformer for Hyperspectral Image Super-resolution",
    "作者": "Mingjin Zhang, Chi Zhang, Qiming Zhang, Jie Guo, Xinbo Gao, Jing Zhang",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhang_ESSAformer_Efficient_Transformer_for_Hyperspectral_Image_Super-resolution_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Zhang_ESSAformer_Efficient_Transformer_for_Hyperspectral_Image_Super-resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Downscaled Representation Matters: Improving Image Rescaling with Collaborative Downscaled Images",
    "作者": "Bingna Xu, Yong Guo, Luoqian Jiang, Mianjie Yu, Jian Chen",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Xu_Downscaled_Representation_Matters_Improving_Image_Rescaling_with_Collaborative_Downscaled_Images_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/xubingna/HCD",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Xu_Downscaled_Representation_Matters_Improving_Image_Rescaling_with_Collaborative_Downscaled_Images_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Efficient-VQGAN: Towards High-Resolution Image Generation with Efficient Vision Transformers",
    "作者": "Shiyue Cao, Yueqin Yin, Lianghua Huang, Yu Liu, Xin Zhao, Deli Zhao, Kaigi Huang",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Cao_Efficient-VQGAN_Towards_High-Resolution_Image_Generation_with_Efficient_Vision_Transformers_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Cao_Efficient-VQGAN_Towards_High-Resolution_Image_Generation_with_Efficient_Vision_Transformers_ICCV_2023_paper.pdf"
  },
  {
    "标题": "DLGSANet: Lightweight Dynamic Local and Global Self-Attention Networks for Image Super-Resolution",
    "作者": "Xiang Li, Jiangxin Dong, Jinhui Tang, Jinshan Pan",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Li_DLGSANet_Lightweight_Dynamic_Local_and_Global_Self-Attention_Networks_for_Image_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Li_DLGSANet_Lightweight_Dynamic_Local_and_Global_Self-Attention_Networks_for_Image_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Learning Correction Filter via Degradation-Adaptive Regression for Blind Single Image Super-Resolution",
    "作者": "Hongyang Zhou, Xiaobin Zhu, Jianqing Zhu, Zheng Han, Shi-Xue Zhang, Jingyan Qin, Xu-Cheng Yin",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhou_Learning_Correction_Filter_via_Degradation-Adaptive_Regression_for_Blind_Single_Image_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/edbca/DARSR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Zhou_Learning_Correction_Filter_via_Degradation-Adaptive_Regression_for_Blind_Single_Image_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Implicit Neural Representation for Cooperative Low-light Image Enhancement",
    "作者": "Shuzhou Yang, Moxuan Ding, Yanmin Wu, Zihan Li, Jian Zhang",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Yang_Implicit_Neural_Representation_for_Cooperative_Low-light_Image_Enhancement_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/Ysz2022/NeRCo",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Yang_Implicit_Neural_Representation_for_Cooperative_Low-light_Image_Enhancement_ICCV_2023_paper.pdf"
  },
  {
    "标题": "SRFormer: Permuted Self-Attention for Single Image Super-Resolution",
    "作者": "Yupeng Zhou, Zhen Li, Chun-Le Guo, Song Bai, Ming-Ming Cheng, Qibin Hou",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhou_SRFormer_Permuted_Self-Attention_for_Single_Image_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/HVision-NKU/",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "Ultra-High-Definition Image",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Zhou_SRFormer_Permuted_Self-Attention_for_Single_Image_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Towards Authentic Face Restoration with Iterative Diffusion Models and Beyond",
    "作者": "Yang Zhao, Tingbo Hou, Yu-Chuan Su, Xuhui Jia, Yandong Li, Matthias Grundmann",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhao_Towards_Authentic_Face_Restoration_with_Iterative_Diffusion_Models_and_Beyond_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/TencentARC/GFPGAN3https://github.com/richzhang/PerceptualSimilarity",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Image Restoration",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Zhao_Towards_Authentic_Face_Restoration_with_Iterative_Diffusion_Models_and_Beyond_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Rethinking Multi-Contrast MRI Super-Resolution: Rectangle-Window Cross-Attention Transformer and Arbitrary-Scale Upsampling",
    "作者": "Guangyuan Li, Lei Zhao, Jiakai Sun, Zehua Lan, Zhanjie Zhang, Jiafu Chen, Zhijie Lin, Huaizhong Lin, Wei Xing",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Li_Rethinking_Multi-Contrast_MRI_Super-Resolution_Rectangle-Window_Cross-Attention_Transformer_and_Arbitrary-Scale_Upsampling_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Li_Rethinking_Multi-Contrast_MRI_Super-Resolution_Rectangle-Window_Cross-Attention_Transformer_and_Arbitrary-Scale_Upsampling_ICCV_2023_paper.pdf"
  },
  {
    "标题": "MoTIF: Learning Motion Trajectories with Local Implicit Neural Functions for Continuous Space-Time Video Super-Resolution",
    "作者": "Yi-Hsin Chen, Si-Cun Chen, Yi-Hsin Chen, Yen-Yu Lin, Wen-Hsiao Peng",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Chen_MoTIF_Learning_Motion_Trajectories_with_Local_Implicit_Neural_Functions_for_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/sichun233746/MoTIF",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Chen_MoTIF_Learning_Motion_Trajectories_with_Local_Implicit_Neural_Functions_for_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Self-Supervised Burst Super-Resolution",
    "作者": "Goutam Bhat, Michaël Gharbi, Jiawen Chen, Luc Van Gool, Zhihao Xia",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Bhat_Self-Supervised_Burst_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Bhat_Self-Supervised_Burst_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Content-Aware Local GAN for Photo-Realistic Super-Resolution",
    "作者": "JoonKyu Park, Sanghyun Son, Kyoung Mu Lee",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Park_Content-Aware_Local_GAN_for_Photo-Realistic_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/jkpark0825/CAL",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Park_Content-Aware_Local_GAN_for_Photo-Realistic_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Decomposition-Based Variational Network for Multi-Contrast MRI Super-Resolution and Reconstruction",
    "作者": "Pengcheng Lei, Faming Fang, Guixu Zhang, Tieyong Zeng",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Lei_Decomposition-Based_Variational_Network_for_Multi-Contrast_MRI_Super-Resolution_and_Reconstruction_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/lpcccc-",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Lei_Decomposition-Based_Variational_Network_for_Multi-Contrast_MRI_Super-Resolution_and_Reconstruction_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Learning Data-Driven Vector-Quantized Degradation Model for Animation Video Super-Resolution",
    "作者": "Zixi Tuo, Huan Yang, Jianlong Fu, Yujie Dun, Xueming Qian",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Tuo_Learning_Data-Driven_Vector-Quantized_Degradation_Model_for_Animation_Video_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/researchmm/VQD-SR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Tuo_Learning_Data-Driven_Vector-Quantized_Degradation_Model_for_Animation_Video_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "LMR: A Large-Scale Multi-Reference Dataset for Reference-Based Super-Resolution",
    "作者": "Lin Zhang, Xin Li, Dongliang He, Fu Li, Errui Ding, Zhaoxiang Zhang",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhang_LMR_A_Large-Scale_Multi-Reference_Dataset_for_Reference-Based_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "https://github.com/wdmwhh/MRefSR",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Zhang_LMR_A_Large-Scale_Multi-Reference_Dataset_for_Reference-Based_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Multi-Frequency Representation Enhancement with Privilege Information for Video Super-Resolution",
    "作者": "Fei Li, Linfeng Zhang, Zikun Liu, Juan Lei, Zhenbo Li",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Li_Multi-Frequency_Representation_Enhancement_with_Privilege_Information_for_Video_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Li_Multi-Frequency_Representation_Enhancement_with_Privilege_Information_for_Video_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "Spherical Space Feature Decomposition for Guided Depth Map Super-Resolution",
    "作者": "Zixiang Zhao, Jiangshe Zhang, Xiang Gu, Chengli Tan, Shuang Xu, Yulun Zhang, Radu Timofte, Luc Van Gool",
    "时间": "2023",
    "发表于": "ICCV2023",
    "论文链接": "https://openaccess.thecvf.com/content/ICCV2023/html/Zhao_Spherical_Space_Feature_Decomposition_for_Guided_Depth_Map_Super-Resolution_ICCV_2023_paper.html",
    "代码仓库": "",
    "论文的模型主图链接": "https://openaccess.thecvf.com/img/cropped-cvf-s.jpg",
    "搜索关键词": "4K Super-Resolution",
    "会议": "ICCV2023",
    "相关度": "关键词搜索匹配",
    "PDF链接": "https://openaccess.thecvf.com/content/ICCV2023/papers/Zhao_Spherical_Space_Feature_Decomposition_for_Guided_Depth_Map_Super-Resolution_ICCV_2023_paper.pdf"
  },
  {
    "标题": "SRDiff: Single Image Super-Resolution with Diffusion Probabilistic Models",
    "作者": "Haoying Li, Yifan Yang, Meng Chang, Huajun Feng, Zhihai Xu, Qi Li, Yueting Chen",
    "时间": "2022",
    "发表于": "Neurocomputing 2022",
    "论文链接": "https://arxiv.org/abs/2104.14951",
    "代码仓库": ""
  },
  {
    "标题": "Face Super-Resolution Using Stochastic Differential Equations",
    "作者": "Marcelo dos Santos, Rayson Laroca, Rafael O. Ribeiro, João Neves, Hugo Proença, David Menotti",
    "时间": "2022",
    "发表于": "SIBGRAPI 2022",
    "论文链接": "https://arxiv.org/abs/2209.12064",
    "代码仓库": "https://github.com/marcelowds/sr-sde"
  },
  {
    "标题": "Implicit Diffusion Models for Continuous Super-Resolution",
    "作者": "Sicheng Gao, Xuhui Liu, Bohan Zeng, Sheng Xu, Yanjing Li, Xiaoyan Luo, Jianzhuang Liu, Xiantong Zhen, Baochang Zhang",
    "时间": "2023",
    "发表于": "CVPR2023",
    "论文链接": "https://openaccess.thecvf.com/content/CVPR2023/papers/Gao_Implicit_Diffusion_Models_for_Continuous_Super-Resolution_CVPR_2023_paper.pdf",
    "代码仓库": "https://github.com/Ree1s/IDM"
  },
  {
    "标题": "DiffIR: Efficient diffusion model for image restoration",
    "作者": "Bin Xia, Yulun Zhang, Shiyin Wang, Yitong Wang, Xinglong Wu, Yapeng Tian, Wenming Yang, and Luc Van Gool",
    "时间": "2023",
    "发表于": "ICCV 2023",
    "论文链接": "https://arxiv.org/abs/2303.09472",
    "代码仓库": "https://github.com/Zj-BinXia/DiffIR"
  },
  {
    "标题": "ResShift: Efficient Diffusion Model for Image Super-resolution by Residual Shifting",
    "作者": "Zongsheng Yue, Jianyi Wang, Chen Change Loy",
    "时间": "2023",
    "发表于": "NeurIPS 2023",
    "论文链接": "https://arxiv.org/pdf/2307.12348",
    "代码仓库": "https://github.com/zsyOAOA/ResShift"
  },
  {
    "标题": "Efficient Conditional Diffusion Model with Probability Flow Sampling for Image Super-resolution",
    "作者": "Yutao Yuan, Chun Yuan",
    "时间": "2024",
    "发表于": "AAAI 2024",
    "论文链接": "https://arxiv.org/abs/2404.10688",
    "代码仓库": "https://github.com/Yuan-Yutao/ECDP"
  },

  {
    "标题": "Binarized Diffusion Model for Image Super-Resolution",
    "作者": "Zheng Chen, Haotong Qin, Yong Guo, Xiongfei Su, Xin Yuan, Linghe Kong, Yulun Zhang",
    "时间": "2024",
    "发表于": "NeurIPS 2024",
    "论文链接": "https://arxiv.org/abs/2406.05723",
    "代码仓库": "https://github.com/zhengchen1999/BI-DiffSR"
  }
  ,
  {
    "标题": "Taming Diffusion Prior for Image Super-Resolution with Domain Shift SDEs",
    "作者": "Qinpeng Cui, Yixuan Liu, Xinyi Zhang, Qiqi Bao, Qingmin Liao, Li Wang, Tian Lu, Zicheng Liu, Zhongdao Wang, Emad Barsoum",
    "时间": "2024",
    "发表于": "NeurIPS 2024",
    "论文链接": "https://arxiv.org/abs/2409.17778",
    "代码仓库": "https://github.com/QinpengCui/DoSSR"
  }
    ];
    
    // 创建筛选器
    createFilters(papersData);
    
    // 渲染论文卡片（使用分页功能）
    renderPapers(papersData);
    
    // 创建筛选器的函数
    function createFilters(papers) {
        // 获取所有会议和年份
        const conferences = [...new Set(papers.map(paper => paper.会议))];
        const years = [...new Set(papers.map(paper => paper.时间))].sort((a, b) => b - a); // 降序排列年份
        
        // 获取筛选器容器
        const filterContainer = document.querySelector('.flex.flex-wrap.gap-4.mb-10');
        if (!filterContainer) return;
        
        // 清空现有的筛选器按钮
        filterContainer.innerHTML = '';
        
        // 添加"全部"按钮
        const allButton = document.createElement('button');
        allButton.className = 'bg-primary text-white px-4 py-2 rounded-lg filter-btn';
        allButton.textContent = '全部';
        allButton.dataset.filter = 'all';
        filterContainer.appendChild(allButton);
        
        // 创建会议下拉框
        const conferenceSelect = document.createElement('select');
        conferenceSelect.className = 'bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200';
        conferenceSelect.innerHTML = '<option value="">选择会议</option>';
        conferences.forEach(conf => {
            const option = document.createElement('option');
            option.value = conf;
            option.textContent = conf;
            conferenceSelect.appendChild(option);
        });
        filterContainer.appendChild(conferenceSelect);
        
        // 创建年份下拉框 - 已注释掉
        /*
        const yearSelect = document.createElement('select');
        yearSelect.className = 'bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200';
        yearSelect.innerHTML = '<option value="">选择年份</option>';
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
        filterContainer.appendChild(yearSelect);
        */
        
        // 添加"有代码"筛选按钮
        const codeButton = document.createElement('button');
        codeButton.className = 'bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors filter-btn';
        codeButton.textContent = '已开源';
        codeButton.dataset.filter = 'code';
        filterContainer.appendChild(codeButton);
        
        // 添加事件监听器
        conferenceSelect.addEventListener('change', filterPapers);
        // yearSelect.addEventListener('change', filterPapers); // 已注释掉
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // 重置下拉框
                conferenceSelect.value = '';
                // yearSelect.value = ''; // 已注释掉
                
                // 更新按钮样式
                filterButtons.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white');
                    b.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
                });
                this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
                this.classList.add('bg-primary', 'text-white');
                
                // 筛选论文
                if (this.dataset.filter === 'all') {
                    renderPapers(window.papersData);
                } else if (this.dataset.filter === 'code') {
                    const filtered = window.papersData.filter(paper => paper.代码仓库 && paper.代码仓库.trim() !== '');
                    renderPapers(filtered);
                }
            });
        });
        
        // 筛选论文的函数
        function filterPapers() {
            // 重置按钮样式
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            });
            
            const selectedConference = conferenceSelect.value;
            // const selectedYear = yearSelect.value; // 已注释掉
            
            let filtered = window.papersData;
            
            if (selectedConference) {
                filtered = filtered.filter(paper => paper.会议 === selectedConference);
            }
            
            // if (selectedYear) { // 已注释掉
            //     filtered = filtered.filter(paper => paper.时间 === selectedYear);
            // }
            
            renderPapers(filtered);
        }
    }
    
    // 确保papersData在全局作用域可用
    window.papersData = papersData;
    
    // 渲染论文卡片的函数
    function renderPapers(papers) {
        
        // 如果没有论文数据，显示提示信息
        if (!papers || papers.length === 0) {
            papersListContainer.innerHTML = `
                <div class="text-center py-8 col-span-full">
                    <p class="text-gray-500">暂无论文数据</p>
                </div>
            `;
            // 隐藏分页控件
            document.getElementById('pagination-controls').classList.add('hidden');
            document.getElementById('pagination-info').classList.add('hidden');
            return;
        }
        
        // 更新当前论文数据
        currentPapers = papers;
        currentPage = 1;
        
        // 渲染当前页的论文
        renderCurrentPage();
        
        // 更新分页控件
        updatePagination();
        
        // 显示分页控件
        document.getElementById('pagination-controls').classList.remove('hidden');
        document.getElementById('pagination-info').classList.remove('hidden');
    }
    
    // 渲染当前页的论文
    function renderCurrentPage() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPagePapers = currentPapers.slice(startIndex, endIndex);
        

        
        // 清空容器
        papersListContainer.innerHTML = '';
        
        // 遍历当前页论文数据并创建卡片
        currentPagePapers.forEach(paper => {
            // 创建论文卡片
            const paperCard = document.createElement('div');
            paperCard.className = 'bg-white rounded-lg shadow-md overflow-hidden card-hover';
            
            // 获取代码仓库链接
            const hasCode = paper.代码仓库 && paper.代码仓库.trim() !== '';
            
            // 构建卡片内容
            paperCard.innerHTML = `
                <div class="p-4">
                    <h3 class="text-sm font-bold mb-1 text-dark line-clamp-2 h-10" title="${paper.标题}">${paper.标题}</h3>
                    <p class="text-xs text-gray-600 mb-2 line-clamp-1" title="${paper.作者}">${paper.作者}</p>
                    <div class="flex items-center mb-2">
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mr-1">${paper.会议}</span>
                        <span class="text-gray-500 text-xs">${paper.时间}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <a href="${paper.论文链接}" target="_blank" class="text-primary hover:text-primary-dark text-xs">
                            <i class="fa fa-file-pdf-o mr-1"></i> 论文
                        </a>
                        ${hasCode ? `
                            <a href="${paper.代码仓库}" target="_blank" class="text-primary hover:text-primary-dark text-xs">
                                <i class="fa fa-github mr-1"></i> 代码
                            </a>
                        ` : `
                            <span class="text-gray-400 text-xs">
                                <i class="fa fa-code mr-1"></i> 暂无代码
                            </span>
                        `}
                    </div>
                </div>
            `;
            
            // 将卡片添加到容器中
            papersListContainer.appendChild(paperCard);
        });
    }
    
    // 更新分页控件
    function updatePagination() {
        const totalPages = Math.ceil(currentPapers.length / itemsPerPage);
        const pageNumbersContainer = document.getElementById('page-numbers');
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');
        const currentPageInfo = document.getElementById('current-page-info');
        const totalPagesInfo = document.getElementById('total-pages-info');
        
        // 更新页码信息
        currentPageInfo.textContent = currentPage;
        totalPagesInfo.textContent = totalPages;
        
        // 更新上一页/下一页按钮状态
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
        
        // 生成页码按钮
        pageNumbersContainer.innerHTML = '';
        
        // 显示最多5个页码按钮
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // 调整起始页
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // 添加第一页按钮（如果不在可见范围内）
        if (startPage > 1) {
            const firstPageBtn = document.createElement('button');
            firstPageBtn.className = 'px-3 py-1 text-gray-600 hover:text-primary transition-colors';
            firstPageBtn.textContent = '1';
            firstPageBtn.onclick = () => goToPage(1);
            pageNumbersContainer.appendChild(firstPageBtn);
            
            // 添加省略号
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'px-2 text-gray-400';
                ellipsis.textContent = '...';
                pageNumbersContainer.appendChild(ellipsis);
            }
        }
        
        // 添加可见页码按钮
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = i === currentPage 
                ? 'px-3 py-1 bg-primary text-white rounded transition-colors' 
                : 'px-3 py-1 text-gray-600 hover:text-primary transition-colors';
            pageBtn.textContent = i;
            pageBtn.onclick = () => goToPage(i);
            pageNumbersContainer.appendChild(pageBtn);
        }
        
        // 添加最后一页按钮（如果不在可见范围内）
        if (endPage < totalPages) {
            // 添加省略号
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'px-2 text-gray-400';
                ellipsis.textContent = '...';
                pageNumbersContainer.appendChild(ellipsis);
            }
            
            const lastPageBtn = document.createElement('button');
            lastPageBtn.className = 'px-3 py-1 text-gray-600 hover:text-primary transition-colors';
            lastPageBtn.textContent = totalPages;
            lastPageBtn.onclick = () => goToPage(totalPages);
            pageNumbersContainer.appendChild(lastPageBtn);
        }
    }
    
    // 跳转到指定页面
    function goToPage(page) {
        const totalPages = Math.ceil(currentPapers.length / itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderCurrentPage();
            updatePagination();
            
            // 滚动到论文列表顶部
            papersListContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // 绑定分页事件
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const totalPages = Math.ceil(currentPapers.length / itemsPerPage);
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
    }
});