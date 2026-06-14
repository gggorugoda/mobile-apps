# mobile-apps

gggorugoda の公開済みモバイルアプリを掲載する GitHub Pages 用LPです。

## 公開対象

`apps.json` の `published: true` のアプリだけが `index.html` に表示されます。
2026年6月14日時点では、Play Console のアプリ一覧で `製品版` になっている `くまリバー` のみ掲載しています。

## 更新手順

1. Play Console のアプリ一覧で対象5アプリのステータスを確認する。
2. 新しく `製品版` になったアプリがあれば、`apps.json` の該当アプリを `published: true` にする。
3. 画像素材がある場合は `assets/<app-id>/` に配置し、`icon` / `feature` / `screenshots` を更新する。
4. ルートの `index.html` を GitHub Pages で公開する。

## 対象アプリ

- お手玉マスター: `otedamamaster.ggg.jp.net`
- くまリバー: `game.kumariver.ggg.jp.net`
- こーつー整理: `trafficPanic.ggg.jp.net`
- まほバトル: `appmagicbattle.ggg.jp.net`
- モコしば！: `game_mokoshiba.ggg.jp.net`
