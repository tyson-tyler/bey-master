"use client";

import BgRemove from "./bg-remove";
import AIBackgroundReplace from "./bg-replace";
import ExtractPart from "./extract-part";

import GenerativeFill from "./generative-fill";
import GenRemove from "./genRemove";
import AIRecolor from "./recolor";

export default function ImageTools() {
  return (
    <>
      <GenerativeFill />

      <GenRemove />
      <AIRecolor />
      <AIBackgroundReplace />
      <ExtractPart />
    </>
  );
}
