-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-05-28 15:57:08
-- 服务器版本： 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phplesson`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `category` varchar(10) NOT NULL,
  `news_title` varchar(100) NOT NULL,
  `news_image` varchar(300) NOT NULL,
  `news_content` text NOT NULL,
  `news_addtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`news_id`, `category`, `news_title`, `news_image`, `news_content`, `news_addtime`) VALUES
(29, '推荐', '《再见》片方喊话方励:不互踩', 'http://t10.baidu.com/it/u=http://n.sinaimg.cn/ent/transform/20160503/CaGx-fxrtzte9886413.jpg&fm=36', '张建斌向观众们喊话，还是希望大家能多去看看《再见，在也不见》，我们没有有多少票房上的期待，只是...', '2016-05-18 00:00:00'),
(30, '推荐', '马英九:如果说我无能 那李登辉、陈水扁呢?', 'http://t10.baidu.com/it/u=http://n1.itc.cn/img7/adapt/wb/bindTVPic/2016/05/17/146347732414087080_720_1000.JPEG&fm=36', '资料视频：马英九称台湾能参与国际组织是因有“九二共识”。', '2016-05-18 00:00:00'),
(31, '推荐', '马云：十年后BAT未必在，阿里每天都如履薄冰', 'http://t10.baidu.com/it/u=http://www.qidic.com/wp-content/uploads/2016/04/7ab2f005ea6088aeae0a009436de6523_848.jpg&fm=36', '新东方教育集团董事长俞敏洪发言时也不忘把难题抛向马云，10年内BAT肯定还在，100年后它们肯...', '2016-05-18 00:00:00'),
(32, '推荐', '欧洲俱乐部最新排名：皇马榜首 看曼联滑落到哪了', 'http://t11.baidu.com/it/u=http://img04.imgcdc.com/grab/img/20160517/36011463493732.jpg&fm=36', '值得一提的是，英超史上第一豪门曼联已经滑落至第20位，令人唏嘘。', '2016-05-18 00:00:00'),
(33, '图片', '美军一架B52坠毁 被烧成骨架', 'http://timg01.baidu-img.cn/timg?tc&size=b627_352&sec=0&quality=100&cut_x=0&cut_y=44&cut_h=352&cut_w=0&di=e181206f5c977b8f1fffa663494209a1&src=http%3A%2F%2Ft11.baidu.com%2Fit%2Fu%3Dhttp%3A%2F%2Fl.sinaimg.cn%2Fwww%2Fdy%2Fslidenews%2F8_img%2F2016_20%2F197_176431_672518.jpg%2Foriginal.jpg%26fm%3D94', '', '2016-05-18 00:00:00'),
(34, '图片', '快递哥发现600斤冰毒 获奖10万元', 'http://timg01.baidu-img.cn/timg?tc&size=b960_540&sec=0&quality=100&cut_x=0&cut_y=50&cut_h=540&cut_w=0&di=09340122f1b8cc60e786d05fbf5a64d5&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F304359940%2F1000', '', '2016-05-18 07:00:00'),
(35, '图片', '新鲜武昌鱼来了!国产最强039C潜艇曝光', 'http://timg01.baidu-img.cn/timg?tc&size=b950_534&sec=0&quality=100&cut_x=0&cut_y=51&cut_h=534&cut_w=0&di=fb3f1d95424e020b2a30cf757ec5e47b&src=http%3A%2F%2Fl.sinaimg.cn%2Fwww%2Fdy%2Fslidenews%2F8_img%2F2016_20%2F203_176196_595002.jpg%2Foriginal.jpg', '', '2016-05-18 07:00:00'),
(36, '本地', ' 北京专家：蔡英文如不承认“两岸一中” 现状难维持', ' ', '杨立宪表示，与陈水扁时代相比，蔡英文的两岸政策有所调整。', '2016-05-18 07:00:00'),
(37, '本地', ' 北京城际铁路S6线拟设站17座 2019年底竣工', ' ', '线路初步考虑设站17座，其中北京境内15座，廊坊境内2座。', '2016-05-18 07:00:00'),
(38, '本地', ' 业内人士称北京多个楼盘被豪宅化：风险很大', ' ', '融创中国董事会主席孙宏斌表示，北京很多项目被豪宅化，“一个城市不可能这么多豪宅”。', '2016-05-19 00:00:00'),
(39, '百家', ' GPLP解析：由复星昆仲人事动荡看复星系PE的投资真相', ' http://f.hiphotos.baidu.com/news/w%3D638/sign=406f21504010b912bfc1f5fdfbfcfcb5/7a899e510fb30f24cfd98ae8cf95d143ac4b039d.jpg', '在资金充裕的大背景下，如果受制于人，那还不如单干，正如复星谱润的创始人周林林。', '2016-05-18 07:00:00'),
(40, '百家', ' 看懂五个问题，就看懂了中国机器人产业的现状和未来', ' http://c.hiphotos.baidu.com/news/w%3D638/sign=e462b6ecabaf2eddd4f14aeab5110102/8d5494eef01f3a29bf9e1d249e25bc315d607c82.jpg', '一机器人会不会导致一线工人失业。', '2016-05-18 07:00:00'),
(41, '百家', ' “重新定义电影院”的万达会不会重新定义院线行业?', ' http://d.hiphotos.baidu.com/news/crop%3D0%2C30%2C999%2C599%3Bw%3D638/sign=dcf4b0d3ce3d70cf58b5f04dc5ecfd33/b90e7bec54e736d18ce46ee29c504fc2d4626961.jpg', '尽管曾茂军在13日接受察影采访时并未直接提到万达院线的目标是分线发行，但他认为，中国院线发行市...', '2016-05-18 00:00:00'),
(42, '推荐', '《再见》片方喊话方励:不互踩', 'http://t10.baidu.com/it/u=http://n.sinaimg.cn/ent/transform/20160503/CaGx-fxrtzte9886413.jpg&fm=36', '张建斌向观众们喊话，还是希望大家能多去看看《再见，在也不见》，我们没有有多少票房上的期待，只是...', '2016-05-18 00:00:00'),
(43, '图片', '马英九:如果说我无能 那李登辉、陈水扁呢?', 'http://t10.baidu.com/it/u=http://n1.itc.cn/img7/adapt/wb/bindTVPic/2016/05/17/146347732414087080_720_1000.JPEG&amp;fm=36', '资料视频：马英九称台湾能参与国际组织是因有&ldquo;九二共识&CloseCurlyDoubleQuote;。', '2016-05-17 00:00:00'),
(51, '本地', '&lt;script&gt;M&lt;/script&gt;&apos;&apos;&apos;11', '', 'test', '2016-05-13 00:00:00'),
(52, '推荐', '老人被撞倒:有医保你们不担责', 'http://t10.baidu.com/it/u=http://img1.cache.netease.com/catchpic/4/49/49EA537D81A6A5B678CD6CE89410741B.jpg&fm=36', '孩子：撞倒阿婆虽害怕，但觉责任再大也要担。', '2016-05-28 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delete_flag` varchar(1) NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `user_id`, `password`, `role`, `add_time`, `delete_flag`) VALUES
('100a8d4c-2248-4e44-941b-89766709e4c5', 'Admin', '46/tAEewgFnQ+toQ9ADB5Q==', 'Admin', '2016-05-27 15:30:35', 'N');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`),
  ADD KEY `idx_category` (`category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
