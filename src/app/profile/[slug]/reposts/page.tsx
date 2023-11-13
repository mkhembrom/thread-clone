"use client"

import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {}

export default function Reposts({}: Props) {
    const pathname = usePathname();

  return (
    <div className='flex items-center justify-center'>
     <p className='dark:text-zinc-600'> No reposts</p>
    </div>
  )
}