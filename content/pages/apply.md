---
title: Apply
description: Costs, deadlines, eligibility and video audition instructions for Jazz in the Mountains, an adult jazz camp in {{camp.town}}.
banner: ../images/photos/dsc01665.jpg
bannerAlt: A trumpeter plays under blue stage light
intro: Applying takes two steps, an online application and a video audition. Placement decisions go out by {{deadline.placement}}.
# Eligibility rules, dates, fees and links come from content/data/.
# `deadline` is an id from content/data/deadlines.yaml.
steps:
  - title: Submit the online application
    deadline: application
    body: Tell us about yourself, your instrument and your playing experience.
    button: { label: Complete the application, href: "{{links.forms.application}}" }
  - title: Record and upload your video audition
    deadline: audition
    body: >-
      All new applicants must submit a video, and returning campers are
      encouraged to send a new one. Acceptance and band placement depend on
      your video, or on the one we already have on file. See the audition
      instructions below.
    button: { label: Upload your video, href: "{{links.forms.videoUpload}}" }
  - title: Get your placement
    deadline: placement
    body: We'll email you with your acceptance, your band placement and an outline of the week.
  - title: Confirm and pay
    deadline: payment
    body: >-
      Confirm that you're attending and request a room type by
      {{deadline.commitment}}, then pay the full camp fee by {{deadline.payment}}.
      Ensemble music goes out by {{deadline.music}}, and any gear rentals must
      be arranged and paid for by {{deadline.gear}}.
audition:
  - title: Recording tips
    body: |-
      1. A smartphone or tablet works fine. Ask a friend to hold it if that helps.
      2. Record in a room without echo, such as a carpeted bedroom.
      3. Light your face well, and keep at least part of your instrument in the frame.
  - title: Horns
    body: |-
      Everyone uses the same play-along track.

      - **Chorus 1:** play the head
      - **Chorus 2:** improvise (optional, but recommended)
      - **Chorus 3:** play the head

      **Lead trumpet, lead trombone and bass trombone candidates:** also play the lead or bass excerpt from the PDF unaccompanied, without counting the rests.
  - title: Piano, guitar and bass
    body: |-
      Use the track for your instrument. Chords are removed from the piano and guitar track, and bass is removed from the bass track.

      - **Chorus 1:** head
      - **Chorus 2:** accompany
      - **Chorus 3:** improvise (optional, but recommended)
      - **Chorus 4:** head
  - title: Drums
    body: |-
      - **Chorus 1:** play the melody's rhythms
      - **Chorus 2:** comp behind the recorded soloist
      - **Chorus 3:** trade 8s
      - **Chorus 4:** comp through the tagged ending

      Then play a short sampling of the styles below.
    image: ../images/drum-styles.png
    imageAlt: Drum audition chart listing the styles to play
  - title: Naming and uploading your video
    body: |-
      Name your file with your name, instrument and the camp year, like this:

      **FirstnameLastname_Instrument_JITM{{camp.year}}.mp4**

      You may send more than one video. Saxophonists can send a single video and list any other woodwinds they play.
---
