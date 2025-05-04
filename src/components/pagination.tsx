'use client'
import { useRouter } from 'next/navigation'
import { ListFilter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'

export default function Pagination({
  hasNextPage,
  pageSize,
  currentPage,
  totalUsersCount,
}: {
  hasNextPage: boolean
  pageSize: string
  currentPage: string
  totalUsersCount: number
}) {
  let lastPage = Math.ceil(totalUsersCount / Number(pageSize))

  const router = useRouter()

  function onNextPage() {
    if (!hasNextPage) return
    const offset = Number(currentPage) + 1
    if (offset > lastPage) {
      router.replace(`/users?limit=${pageSize}`)
      return
    }
    router.push(`/users?pageSize=${pageSize}&page=${offset}`)
  }
  function onPreviousPage() {
    const offset = Number(currentPage)
    if (!offset) return
    const newOffset = offset - 1
    if (newOffset <= 1) {
      router.replace(`/users?pageSize=${pageSize}`)
      return
    }
    router.push(`/users?pageSize=${pageSize}&offset=${currentPage}`)
  }
  function setPosition(pageSize: string) {
    router.push(`/users?pageSize=${pageSize}`)
  }

  return (
    <div className="flex flex-row justify-between items-center mt-6 px-4">
      <Button disabled={Number(currentPage) <= 1} onClick={onPreviousPage}>
        Previous
      </Button>
      <div className="flex flex-row items-center gap-2">
        <span>
          Page {currentPage} of {lastPage}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ListFilter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={pageSize} defaultValue={pageSize} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button disabled={Number(currentPage) >= lastPage} onClick={onNextPage}>
        Next
      </Button>
    </div>
  )
}
