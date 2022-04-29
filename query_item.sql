SELECT nftid,
  nft.picture,
  sexe,
  ranking,
  aura.name                   AS aura,
  aura.occurencepercent       AS aura_percent,
  background.name             AS background,
  background.occurencepercent AS background_percent,
  body.name                   AS body,
  body.occurencepercent       AS body_percent,
  armor.name                  AS armor,
  armor.occurencepercent      AS armor_percent,
  eyes.name                   AS eyes,
  eyes.occurencepercent       AS eyes_percent,
  hairhelmet.name             AS hairhelmet,
  hairhelmet.occurencepercent AS hairhelmet_percent,
  jewelry.name                AS jewelry,
  jewelry.occurencepercent    AS jewelry_percent,
  makeup.name                 AS makeup,
  makeup.occurencepercent     AS makeup_percent,
  mask.name                   AS mask,
  mask.occurencepercent       AS mask_percent,
  mouth.name                  AS mouth,
  mouth.occurencepercent      AS mouth_percent,
  rank.name                   AS rank,
  rank.occurencepercent       AS rank_percent,
  scars.name                  AS scars,
  scars.occurencepercent      AS scars_percent
FROM main.nft nft
  INNER JOIN main.aura aura
  ON aura.auraid = nft.aura
  INNER JOIN main.background background
  ON background.backgroundid = nft.background
  INNER JOIN main.body body
  ON body.bodyid = nft.body
  INNER JOIN main.armor armor
  ON armor.armorid = nft.armor
  INNER JOIN main.eyes eyes
  ON eyes.eyesid = nft.eyes
  INNER JOIN main.hairhelmet hairhelmet
  ON hairhelmet.hairhelmetid = nft.hairhelmet
  INNER JOIN main.jewelry jewelry
  ON jewelry.jewelryid = nft.jewelry
  INNER JOIN main.makeup makeup
  ON makeup.makeupid = nft.makeup
  INNER JOIN main.mask mask
  ON mask.maskid = nft.mask
  INNER JOIN main.mouth mouth
  ON mouth.mouthid = nft.mouth
  INNER JOIN main.rank rank
  ON rank.rankid = nft.rank
  INNER JOIN main.scars scars
  ON scars.scarsid = nft.scars
WHERE  nftid = $1; 