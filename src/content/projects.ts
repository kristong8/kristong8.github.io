import { assetUrl } from '../urls'
import type { Text } from '../lang'

type Picture = { src: string; alt: string }

export type Project = {
  id: string
  title: string
  shortTitle?: Text
  /** where it was made: a company, a school, 'Open source' */
  org: string
  period: string
  /** one sentence: what it is */
  pitch: Text
  /** who it was made with, shown under the pitch */
  with?: { name: string; href: string }
  cover?: Picture
  slides: (Picture & { title: Text; body: Text })[]
  /** a 60–90 s screen recording, shown as a slide after the cover, with a line on what it follows */
  film?: { src: Text; poster: Text; caption: Text }
  metrics: { value: string; label: Text; caveat: Text }[]
  results?: Picture
  /** what in the demo is illustrative rather than real */
  disclaimer?: Text
  stack: string[]
  /** the details page: background, what I did, method and trade-offs; results and links follow from the fields above */
  details: { heading: Text; body: Text[] }[]
  /** the project's own public site, when it is live */
  site?: string
  links: { label: Text; href: string }[]
}

export type Slide =
  | { kind: 'cover' }
  | { kind: 'film'; src: Text; poster: Text; caption: Text }
  | { kind: 'picture'; src: string; alt: string; title: Text; body: Text }
  | { kind: 'results' }

export function slidesOf(p: Project): Slide[] {
  return [
    { kind: 'cover' },
    ...(p.film ? [{ kind: 'film' as const, ...p.film }] : []),
    ...p.slides.map((s) => ({ kind: 'picture' as const, ...s })),
    ...(p.metrics.length ? [{ kind: 'results' as const }] : []),
  ]
}

export function contextOf(p: Project) {
  return [p.org, p.period].filter(Boolean).join(' · ')
}

const text = (en: string, zh: string): Text => ({ en, zh })
const photo = (file: string, alt: string): Picture => ({ src: assetUrl('/projects-media/' + file), alt })
const report = (number: number) => [{ label: text('Full report →', '完整报告 →'), href: 'https://kkristong.github.io/' + number + '/' }]
export const course = 'UC Berkeley · CS 180'
const fall = 'Fall 2026'

export const projects: Project[] = [
  {
    id: 'flow-matching',
    title: 'Fun with Flow Models',
    shortTitle: text('Flow Models', '流模型'),
    org: course,
    period: fall,
    pitch: text('Trained conditional flow models and explored how a generated image can change meaning when rotated or viewed from afar.', '训练条件流匹配模型，并用生成图像探索旋转与观看距离如何改变人看到的内容。'),
    cover: photo('flow-anagram.jpg', 'An oil-painting visual anagram of a flower-crowned woman and a vase of flowers'),
    slides: [
      {
        ...photo('flow-samples.jpg', 'Class-conditioned MNIST digit samples after ten epochs'),
        title: text('Train a conditional model', '训练条件生成模型'),
        body: text('I trained time- and class-conditioned flow models on MNIST and compared sampled digits across training checkpoints.', '我在 MNIST 上训练时间条件和类别条件流匹配模型，比较不同训练轮次生成的手写数字。'),
      },
      {
        ...photo('flow-forest-cat.webp', 'Two views of the same hybrid image: a forest up close and a cat-like silhouette from a distance'),
        title: text('One image, two readings', '一张图，两种读法'),
        body: text('Tree trunks and branches stand out up close, while a cat-like silhouette emerges in the smaller view. I combined high-frequency detail from a forest prompt with low-frequency structure from a cat prompt.', '近看是树林的枝干，缩小后会浮现像猫一样的轮廓。我把森林提示词的高频细节和猫提示词的低频轮廓合在了一起。'),
      },
    ],
    metrics: [],
    stack: ['PyTorch', 'U-Net', 'Flow matching'],
    details: [{
      heading: text('What I implemented', '我的实现'),
      body: [
        text('I implemented MNIST denoising U-Nets, time and class conditioning, condition dropout, classifier-free guidance, and Euler sampling.', '我实现了 MNIST 去噪 U-Net、时间与类别条件、条件丢弃、无分类器引导及欧拉采样。'),
        text('With a pretrained model, I used partial noising for image edits and combined predictions to produce rotational illusions and hybrid images.', '使用预训练模型时，我通过部分加噪编辑图像，并组合预测结果来制作旋转错觉和混合图像。'),
      ],
    }],
    links: report(3),
  },
  {
    id: 'image-mosaicing',
    title: 'Image Warping & Mosaicing',
    shortTitle: text('Mosaics', '图像拼接'),
    org: course,
    period: fall,
    pitch: text('Turned overlapping photographs into panoramas, and compared hand-picked correspondences with automatic matching.', '将重叠照片拼成全景图，并比较手动标点与自动特征匹配的效果。'),
    cover: photo('mosaic-storefront.jpg', 'Storefront panorama stitched with feather blending'),
    slides: [
      {
        ...photo('mosaic-matches.jpg', 'Feature correspondences between two overlapping storefront photos'),
        title: text('Find correspondences', '找到对应点'),
        body: text('I used local features and a ratio test to obtain putative matches, then estimated the homography with RANSAC.', '我用局部特征和比率检验找出候选匹配，再用 RANSAC 估计单应矩阵。'),
      },
      {
        ...photo('mosaic-comparison.jpg', 'Manual and automatic mosaics of the same indoor atrium'),
        title: text('Compare the two pipelines', '手动与自动拼接对比'),
        body: text('The report compares manual and automatic stitching, including where the alignment and seams differ.', '报告把手动与自动拼接结果放在一起，比较对齐偏差和接缝。'),
      },
    ],
    metrics: [],
    stack: ['Python', 'Homographies', 'RANSAC'],
    details: [{
      heading: text('Method', '方法'),
      body: [text('I solved homographies from point correspondences, compared nearest-neighbor and bilinear interpolation, and feather-blended images on a shared canvas.', '我根据对应点求解单应矩阵，比较最近邻与双线性插值，并在公共画布上使用羽化权重融合图像。')],
    }],
    links: report(4),
  },
  {
    id: 'color-from-glass-plates',
    title: 'Color from Glass Plates',
    shortTitle: text('Color Plates', '底片重建'),
    org: course,
    period: fall,
    pitch: text('Reconstructed color photographs from Prokudin-Gorskii’s three glass-plate exposures.', '对齐普罗库金-戈尔斯基玻璃底片的三张曝光，重建彩色照片。'),
    cover: photo('plates-emir.jpg', 'Reconstructed photograph of the Emir after Sobel-based alignment'),
    slides: [
      {
        ...photo('plates-raw-ncc.jpg', 'Misaligned color channels when using raw normalized cross-correlation'),
        title: text('When raw correlation fails', '原始相关性何时失效'),
        body: text('Brightness differs between channels on this plate. Comparing Sobel edges gives the search a more stable cue.', '这张底片的通道亮度差异较大。比较 Sobel 边缘能为位移搜索提供更稳定的线索。'),
      },
      {
        ...photo('plates-cathedral.jpg', 'Aligned and colorized photograph of a cathedral'),
        title: text('Recover the color image', '重建彩色图像'),
        body: text('A coarse-to-fine search finds the offsets before the aligned channels are merged into RGB.', '用由粗到细的搜索找到位移，再将对齐的通道合成 RGB。'),
      },
    ],
    metrics: [],
    stack: ['Python', 'NumPy', 'Image pyramids'],
    details: [{
      heading: text('Method', '方法'),
      body: [text('I compared squared differences and normalized cross-correlation, then used an image pyramid for coarse-to-fine alignment. I tested the edge-based approach on four additional scans.', '我比较了平方差和归一化互相关，通过图像金字塔从粗到细对齐，并在另外四张扫描底片上测试了边缘特征方法。')],
    }],
    links: report(1),
  },
  {
    id: 'filters-and-frequencies',
    title: 'Filters & Frequencies',
    shortTitle: text('Frequencies', '滤波与频率'),
    org: course,
    period: fall,
    pitch: text('Used frequency filtering to sharpen images, make a portrait that changes with viewing distance, and blend images across multiple scales.', '用频率滤波锐化图像、制作随观看距离变化的混合肖像，并完成多分辨率图像融合。'),
    cover: photo('filter-highlights.webp', 'Hybrid portrait of Yiren and Efros beside a multiscale apple and orange blend'),
    slides: [
      {
        ...photo('filter-sharpening.webp', 'Original and sharpened Taj Mahal images above the Gaussian blur and extracted high-frequency detail'),
        title: text('Sharpen by restoring fine detail', '加回高频细节，让图像更清晰'),
        body: text('I subtracted a Gaussian-blurred copy from the original to isolate fine detail, then added that detail back. Compare the dome and building edges in the top row.', '我从原图中减去高斯模糊后的图像，提取高频细节，再将细节加回原图。可以对比上排的穹顶和建筑边缘。'),
      },
      {
        ...photo('filter-frequency-breakdown.webp', 'High-pass portrait, low-pass portrait, and hybrid, each above its Fourier magnitude spectrum'),
        title: text('One portrait, two frequencies', '一张肖像，两组频率'),
        body: text('Yiren’s high-frequency facial details are clearer up close, while Efros’s low-frequency features emerge at a distance. The Fourier spectra below each image show what the filters retained.', '近看更容易辨认 Yiren 的高频面部细节，退远看则会浮现 Efros 的低频轮廓。每张图下方的傅里叶频谱展示了滤波后保留的成分。'),
      },
      {
        ...photo('filter-laplacian.jpg', 'Gaussian and Laplacian stacks used to blend an apple and an orange'),
        title: text('Blend by scale', '按尺度融合'),
        body: text('I blended the apple and orange’s Laplacian bands with a Gaussian stack of the mask. The seam transitions gradually in coarse bands while fine fruit texture stays sharp.', '我用掩膜的高斯栈混合苹果和橙子的拉普拉斯频带。粗尺度的接缝过渡更柔和，细尺度的果皮纹理依然清晰。'),
      },
      {
        ...photo('filter-moon.jpg', 'A moon blended into coffee with a circular mask'),
        title: text('Blend with an irregular mask', '用不规则掩膜融合'),
        body: text('I tested a circular mask on a moon-and-coffee composite to see how the seam behaves away from a straight boundary.', '我用圆形掩膜把月亮融入咖啡，观察曲线边界上的过渡效果。'),
      },
    ],
    metrics: [],
    stack: ['Python', 'Fourier analysis', 'Multiscale blending'],
    details: [{
      heading: text('Image sharpening', '图像锐化'),
      body: [text('For the Taj Mahal example, I used a 9 × 9 Gaussian kernel with σ = 2 and added the extracted detail back at full weight (α = 1). In the sea example, increasing α made the waves clearer at first, but the strongest setting produced harsher edges.', '泰姬陵示例使用 9 × 9、σ = 2 的高斯核，并以 α = 1 的权重加回提取出的细节。在海浪示例里，适当提高 α 能让波纹更清晰，但最高一档会让边缘显得生硬。')],
    }, {
      heading: text('Frequency filtering and hybrid images', '频率滤波与混合图像'),
      body: [text('After aligning the portraits by the eyes, I used Gaussian filtering to separate Yiren’s fine details from Efros’s broader features, then checked the high-pass, low-pass, and hybrid results in the Fourier domain.', '按眼睛位置对齐人像后，我用高斯滤波提取 Yiren 的细节和 Efros 的整体轮廓，并在傅里叶域检查高通、低通与混合结果。')],
    }, {
      heading: text('Multiresolution blending', '多分辨率融合'),
      body: [text('I built six-level Gaussian and Laplacian stacks without downsampling. After blending each band with a smoothed mask, I summed the bands to reconstruct the result. I tried a straight seam for the fruit and a circular mask for the moon in coffee.', '我构建了不做下采样的六层高斯栈和拉普拉斯栈，用各尺度平滑后的掩膜融合频带，再相加重建图像。我分别测试了苹果和橙子的直线接缝，以及月亮咖啡的圆形掩膜。')],
    }],
    links: report(2),
  },
  {
    id: 'camera-perspective',
    title: 'Becoming Friends with Your Camera',
    shortTitle: text('Camera', '相机透视'),
    org: course,
    period: fall,
    pitch: text('A photographic study of how distance, focal length, and framing change perspective.', '通过实拍观察拍摄距离、焦距和构图如何影响透视。'),
    cover: photo('camera-eggplant.jpg', 'A plush eggplant on a ledge, from the dolly zoom sequence'),
    slides: [],
    metrics: [],
    stack: ['Photography', 'Perspective', 'Dolly zoom'],
    details: [],
    links: report(0),
  },
  {
    id: 'rgbd-motion-tracking',
    title: 'RGB-D Motion Tracking',
    shortTitle: text('3D Tracking', '三维追踪'),
    org: 'Zhejiang University · Guanyun Wang’s Lab',
    period: 'Jul–Sep 2026',
    pitch: text('Recovered 3D trajectories from experiments on moisture-responsive wooden helices.', '从湿度响应木质螺旋结构的实验影像中恢复三维运动轨迹。'),
    cover: photo('rgbd-trajectory.jpg', 'Tracked 3D trajectory and its projection onto the XY plane'),
    slides: [{
      ...photo('rgbd-frame-coordinates.webp', 'X, Y, and Z coordinates plotted over video frames for four tracked points'),
      title: text('Inspect motion frame by frame', '逐帧检查运动'),
      body: text('Plotting each coordinate against frame number made it easier to check where tracks diverged and where a depth jump needed a closer look.', '把每个坐标分量随帧号画出来，可以检查不同点的轨迹何时分开，以及哪些深度跳变需要回看原始画面。'),
    }],
    metrics: [],
    stack: ['Python', 'CoTracker3', 'RGB-D'],
    details: [
      {
        heading: text('From footage to trajectories', '从影像到轨迹'),
        body: [text('I combined dual-camera and RGB-D imaging with CoTracker3 and template matching, and handled missing observations, depth jumps, and trajectory noise.', '我结合双相机和 RGB-D 成像、CoTracker3 与模板匹配，处理观测缺失、深度跳变和轨迹噪声。')],
      },
      {
        heading: text('How I compared motion', '如何比较运动'),
        body: [text('I computed path length, velocity, and swept area, and built 3D plots, projections, and time series to compare experiments and support entanglement analysis.', '我计算路径长度、速度和扫掠面积，绘制三维轨迹、投影和时间序列，用于比较实验并辅助缠绕分析。')],
      },
    ],
    links: [],
  },
  {
    id: 'flextok-evaluation',
    title: 'FlexTok: Visual Token Budgets',
    shortTitle: 'FlexTok',
    org: 'Independent project',
    period: 'Oct 2025',
    pitch: text('Measured how image reconstruction changes when a pretrained visual tokenizer gets fewer tokens.', '评估预训练视觉 tokenizer 在更少 token 下的图像重建变化。'),
    cover: photo('flextok-reconstructions.jpg', 'Reconstructions from different token budgets alongside the original images'),
    slides: [],
    results: photo('flextok-token-metrics.jpg', 'PSNR, LPIPS, and FID across token budgets on Kodak24'),
    metrics: [
      { value: '24', label: text('images', '张图像'), caveat: 'Kodak24' },
      { value: '9', label: text('token budgets', '种 token 预算'), caveat: '1–256 tokens' },
    ],
    stack: ['PyTorch', 'PSNR', 'LPIPS', 'FID'],
    details: [{
      heading: text('Evaluation', '评估'),
      body: [text('I kept prefixes of 1, 2, 4, 8, 16, 32, 64, 128, and 256 tokens and decoded each budget for all 24 Kodak24 images. I compared pixel fidelity with PSNR and perceptual similarity with LPIPS, and included FID as an exploratory metric on this small set.', '我对 Kodak24 的全部 24 张图像保留 1、2、4、8、16、32、64、128 或 256 个前缀 token，再分别解码。用 PSNR 比较像素保真度，用 LPIPS 比较感知相似度，并在这组小样本上记录 FID 作为探索性指标。')],
    }, {
      heading: text('What the early tokens retain', '前几个 token 保留了什么'),
      body: [text('At low budgets, the decoded images can retain a broad subject or layout while changing the object, viewpoint, or texture. In the statue example, the first few reconstructions vary substantially, and the 16-token image is closer to the reference pose and framing.', '预算很低时，重建图可能保留大致主题或构图，物体、视角和纹理仍会变化。以雕像为例，最前几档的重建差异很大，16 个 token 的结果在姿态和构图上更接近原图。')],
    }],
    links: [],
  },
  {
    id: 'maskgit-experiments',
    title: 'MaskGIT: Generation & Editing',
    shortTitle: 'MaskGIT',
    org: 'Independent project',
    period: 'Sep 2025',
    pitch: text('Explored how token masking affects class-conditional generation and local image editing with a pretrained MaskGIT model.', '使用预训练 MaskGIT，探索 token 掩蔽如何影响类别条件生成和局部图像编辑。'),
    cover: photo('maskgit-local-edit.jpg', 'Input with the edit region marked and several MaskGIT outputs'),
    slides: [
      {
        ...photo('maskgit-lorikeets.webp', 'Eight 256-pixel MaskGIT samples generated with the lorikeet class label'),
        title: text('Generate from a class label', '用类别标签生成'),
        body: text('Using the 256 × 256 pretrained checkpoint and the ImageNet lorikeet label, I generated eight samples and compared how the birds, poses, and backgrounds varied under one class condition.', '我用 256 × 256 预训练权重和 ImageNet 的吸蜜鹦鹉标签生成八张图，观察同一个类别条件下，鸟的外观、姿态和背景如何变化。'),
      },
      {
        ...photo('maskgit-token-masks.webp', 'Three token mask settings with mask visualizations and corresponding dog image samples'),
        title: text('Vary the token mask', '改变 token 遮罩比例'),
        body: text('I sampled scattered positions in the token grid with mask settings of 0.3, 0.5, and 0.7. The red cells show the positions actually masked, next to two decoded examples per setting.', '我用 0.3、0.5 和 0.7 三档参数在 token 网格中采样分散的遮罩位置。红色格子标出实际遮住的 token，右边是每档对应的两个解码样例。'),
      },
      {
        ...photo('maskgit-deer-comparison.webp', 'Deer input with a marked edit region, a box-masked output, and a randomly masked output'),
        title: text('Compare two edits on the same deer', '对比同一张小鹿图的两种编辑'),
        body: text('In this example, masking the whole box let the model replace the animal. Random masking at the 0.5 setting preserved more of the original deer and its pose.', '在这张图里，整块遮住框选区域后，模型把动物换掉了。随机遮罩参数设为 0.5 时，重建结果保留了更多原来的鹿和姿态。'),
      },
    ],
    metrics: [],
    stack: ['Masked generation', 'Visual tokens', 'Image editing'],
    details: [{
      heading: text('From a box to a token grid', '从选框到 token 网格'),
      body: [text('For the 512 × 512 edits, I mapped an image-space bounding box onto the 32 × 32 latent grid and composited the decoded edit back into the original image. I then wrote a second masking routine that sampled positions across the grid and visualized the selected tokens.', '在 512 × 512 的局部编辑中，我把图像选框映射到 32 × 32 的潜空间网格，再将解码得到的编辑区域合回原图。随后我写了另一套遮罩流程，在网格中随机采样位置，并把实际遮住的 token 画出来。')],
    }, {
      heading: text('What the examples showed', '这些样例说明了什么'),
      body: [text('Scattered masks can leave visual anchors inside the edited subject. In the deer example, that context helped preserve the animal. These comparisons are qualitative and depend on the input and the selected mask.', '分散遮罩会在编辑主体内部留下一些视觉线索。在小鹿样例中，这些线索帮助保留了原来的动物。这些是定性对比，结果取决于输入图像和遮罩位置。')],
    }],
    links: [],
  },
  {
    id: 'network-inference',
    title: 'Cross-Tissue Network Inference',
    shortTitle: text('Networks', '调控网络'),
    org: 'Zhejiang University · Qishan Wang',
    period: 'Jun 2026–present',
    pitch: text('Compared inference methods for gene regulatory networks across tissues, pairing simulation benchmarks with biological evidence.', '比较跨组织的基因调控网络推断方法，结合模拟基准和生物学证据评估结果。'),
    cover: photo('grn-five-tissue-overlap.webp', 'Jaccard overlap of the top 10,000 GENIE3 edges between five pig tissues'),
    slides: [{
      ...photo('grn-motif-recovery.webp', 'Motif support among top-ranked edges across tissues and inference methods'),
      title: text('Check top-ranked edges for motif support', '检查排名靠前的边有多少 motif 支持'),
      body: text('In pig ovary, 25.0% of CLR’s top 1,000 edges had motif support, compared with 21.9% for PIDC and 17.5% for GENIE3. In pig muscle, GENIE3 reached 29.2% and CLR reached 26.1%.', '在猪卵巢数据中，CLR 排名前 1,000 的边有 25.0% 得到 motif 支持，PIDC 和 GENIE3 分别为 21.9% 和 17.5%。在猪肌肉数据中，GENIE3 和 CLR 分别为 29.2% 和 26.1%。'),
    }],
    results: photo('grn-simulated-benchmark.webp', 'Simulated benchmark comparing AUROC, AUPR, and enrichment over the random baseline'),
    metrics: [
      { value: '0.851', label: 'AUROC', caveat: text('GENIE3 · simulated benchmark', 'GENIE3 · 模拟基准') },
      { value: '0.482', label: 'AUPR', caveat: text('GENIE3 · simulated benchmark', 'GENIE3 · 模拟基准') },
    ],
    stack: ['Python', 'GENIE3', 'CLR', 'PIDC', 'WGCNA'],
    details: [{
      heading: text('Benchmark with known edges', '用已知调控边做基准评估'),
      body: [text('I compared GENIE3, CLR, PIDC, and WGCNA on a simulated network with 100 transcription factors, 500 targets, and 200 samples. With 5% true edges, the random AUPR baseline was 0.05. GENIE3 led both AUROC and AUPR in this setting.', '我在包含 100 个转录因子、500 个靶基因和 200 个样本的模拟网络上比较 GENIE3、CLR、PIDC 和 WGCNA。真实调控边占 5%，随机 AUPR 基线为 0.05。在这项模拟实验中，GENIE3 的 AUROC 和 AUPR 均最高。')],
    }, {
      heading: text('Compare evidence across tissues', '对照不同组织里的证据'),
      body: [
        text('For the real expression data, I checked whether the highest-ranked edges had motif support and compared the rankings by tissue. Motif support serves as an indirect measure of plausibility for the inferred edges.', '在真实表达数据上，我检查排名靠前的边是否有 motif 支持，再比较不同组织的结果。Motif 支持可以作为推断调控关系合理性的间接证据。'),
        text('I also measured overlap among the top 10,000 GENIE3 edges for ovary, muscle, liver, heart, and brain. The strongest overlap was between muscle and liver (Jaccard 0.096). Brain had the lowest average overlap with the other four tissues.', '我还比较了卵巢、肌肉、肝脏、心脏和脑组织中 GENIE3 排名前 10,000 的边。肌肉与肝脏的重合度最高（Jaccard 0.096），脑组织与其他四种组织的平均重合度最低。'),
      ],
    }],
    links: [],
  },
]
