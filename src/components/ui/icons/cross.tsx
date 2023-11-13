"use client"
import { useTheme } from 'next-themes';
import React from 'react'

type Props = {}

export default function CrossIcon({}: Props) {
  const {theme} = useTheme();

  return (
    <svg aria-label="Remove" className="x1lliihq x1n2onr6" color={`${theme == "light" ? "" : "#ffffff"}`} fill={`${theme == "light" ? "" : "rgb(250, 250, 250)"}`} height="12" role="img" viewBox="0 0 24 24" width="12"><title>Remove</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
  )
}