

Verkefni gert í React, npm start til að loadea því upp.


Smá útskýring á hvernig appið er sett upp varðandi components, þar sem þetta fór í smá súpu hjá mer í endann.


Í App.js þá ertu með


BarListContent
 - Aðgerðarlisti vinstra megin.
 - TweetButton (component)


MainWrapper
 - Header
 - MainContent
    - MainTweet
        - input fyrir Tweet á aðalsíðu.
    - MainBottom
        - Listi fyrir aðgerðir og Tweet Takki.
    - TweetList
        - Listi yfir skrifuð tweet birtist.
        - DeleteButton
        - TweetIconList
            - Listi fyrir aðgerðist
            - Modal
                - Reply gluggi
    - TweetDetail
        - Detail um valið tweet frá aðalsíðu.
        - TweetReplyList
            - Listi birtist af reply tweets.
- RightContent
    - RightHeader
    - RightContent
        - TrendList






