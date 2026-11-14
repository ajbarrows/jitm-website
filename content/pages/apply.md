---
title: Apply
description: Costs, deadlines, eligibility and video audition instructions for Jazz in the Mountains, an adult jazz camp in {{camp.town}}.
banner: ../images/photos/2025-trumpet-solo.jpg
bannerAlt: A trumpeter plays during rehearsal
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
# Video audition instructions live in content/data/audition.yaml.
---
