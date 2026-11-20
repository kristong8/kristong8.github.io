// Typed onto the typewriter's sheet, newest first. This page is the CV, but
// a readable one: two or three bullets per job, each with the one fact worth
// keeping. The long versions are on the Projects page. Text in a reader's
// language is a { en, zh } pair (src/lang.ts); dates stay as they are.
// [text](/projects/<id>) in a bullet links to that project's tray.

import type { Text } from '../lang'

export type Job = {
  company: Text
  url: string
  role: Text
  place: Text
  start: string
  end: string
  bullets: Text[]
}

const zju = 'https://www.zju.edu.cn/english/'

export const experience: Job[] = [
  {
    company: { en: 'Guanyun Wang’s Lab · Zhejiang University', zh: '浙江大学 · 王冠云课题组' },
    url: 'https://design.zju.edu.cn/guanyunlab',
    role: { en: 'Undergraduate Researcher · 3D Vision & Motion Analysis', zh: '本科科研实习 · 三维视觉与运动分析' },
    place: { en: 'Hangzhou', zh: '杭州' },
    start: 'Jul 2026',
    end: 'Sep 2026',
    bullets: [
      { en: 'Led 3D measurement and visualization for [moisture-responsive wooden helices](/projects/rgbd-motion-tracking) in a 5–6-person team.', zh: '在 5–6 人团队中负责[湿度响应木质螺旋结构](/projects/rgbd-motion-tracking)的三维测量与可视化。' },
      { en: 'Combined dual-camera and RGB-D recordings with CoTracker3 and template matching. Used reconstructed trajectories to compare path length, velocity, and swept area.', zh: '结合双相机、RGB-D、CoTracker3 和模板匹配恢复运动轨迹，比较路径长度、速度和扫掠面积。' },
      { en: 'Continued supporting the project remotely after the on-site internship.', zh: '线下实习结束后继续远程支持项目。' },
    ],
  },
  {
    company: { en: 'Zhejiang University · Qishan Wang', zh: '浙江大学 · 王起山指导' },
    url: zju,
    role: { en: 'Undergraduate Researcher · Network Inference & Model Evaluation', zh: '本科科研 · 调控网络推断与模型评估' },
    place: { en: 'Hangzhou', zh: '杭州' },
    start: 'Jun 2026',
    end: 'Present',
    bullets: [
      { en: 'Built the preprocessing, inference, and validation workflow for a [cross-tissue network study](/projects/network-inference). Compared GENIE3, CLR, PIDC, and WGCNA.', zh: '为[跨组织调控网络研究](/projects/network-inference)搭建预处理、推断和验证流程，比较 GENIE3、CLR、PIDC 和 WGCNA。' },
      { en: 'Evaluated the inferred networks on simulated data and assessed them against motif and trait annotations.', zh: '用模拟数据评估推断方法，再结合基序与性状注释检查推断结果。' },
    ],
  },
  {
    company: { en: 'Zhejiang University · Student Media', zh: '浙江大学 · 学生媒体' },
    url: zju,
    role: { en: 'Visual Designer', zh: '视觉设计' },
    place: { en: 'Hangzhou', zh: '杭州' },
    start: 'Oct 2024',
    end: 'Present',
    bullets: [
      { en: 'Designed editorial graphics, WeChat layouts, digital red-packet covers, and merchandise for the student press corps and Converged Media Center.', zh: '在学生记者团和融媒体中心参与编辑配图、微信公众号排版、红包封面及文创设计。' },
    ],
  },
]

export type School = { school: Text; degree: Text; start: string; end: string }

export const education: School[] = [
  {
    school: 'UC Berkeley',
    degree: { en: 'Visiting student · Global Computing and Data Science', zh: '访问学生 · 全球计算与数据科学项目' },
    start: 'Aug 2026',
    end: 'Dec 2026',
  },
  {
    school: { en: 'Zhejiang University', zh: '浙江大学' },
    degree: { en: 'Undergraduate · Animal Science, with a focus on statistical genomics and bioinformatics', zh: '本科 · 动物科学，统计基因组学与生物信息学方向' },
    start: 'Sep 2024',
    end: 'Jun 2028 (expected)',
  },
]
