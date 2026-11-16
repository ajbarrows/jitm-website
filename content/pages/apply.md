---
title: Apply
description: Costs, deadlines, eligibility and video submission instructions for Jazz in the Mountains, an adult jazz camp in {{camp.town}}.
banner: ../images/photos/2025-trumpet-solo.jpg
bannerAlt: A trumpeter plays during rehearsal
intro: Applying takes two steps, an online application and a video submission. Placement decisions go out by {{deadline.placement}}.
# Eligibility rules, dates, fees and links come from content/data/.
# `deadline` is an id from content/data/deadlines.yaml.
steps:
  - title: Submit the online application
    deadline: application
    body: Tell us about yourself, your instrument and your playing experience.
    button: { label: Complete the application, href: "{{links.forms.application}}" }
  - title: Record and upload your video submission
    deadline: audition
    body: >-
      All new applicants must submit a video, and returning campers are
      encouraged to send a new one. Acceptance and band placement depend on
      your video, or on the one we already have on file. The instructions
      below cover the music to play, how to record it and where to upload it.
    button: { label: Read the video submission instructions, href: "#audition" }
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
# Shown under "Who can apply", pointing music educators to Earn College Credit.
creditNote:
  label: Earn college credit
  text: Music educators can earn graduate or continuing-education credit for the week through the {{collegeCredit.course}} course.
# Shown under the fee table, linking to the Scholarships page.
scholarshipNote: >-
  We don’t want cost to be what keeps a good musician away. If it’s a barrier
  for you, [we may be able to help](/scholarships/).
# Video submission instructions live in content/data/audition.yaml.
---
