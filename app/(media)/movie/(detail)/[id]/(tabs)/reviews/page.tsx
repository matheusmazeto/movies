import { tmdb } from "@/tmdb/api"

import { ListPagination } from "@/components/list-pagination"
import { ReviewCard } from "@/components/review-card"

interface DetailReviewsProps {
  params: {
    id: string
  }
  searchParams: {
    page: string
  }
}

export async function generateMetadata({ params }: DetailReviewsProps) {
  const { title } = await tmdb.movie.detail({
    id: params.id,
  })

  return {
    title: `Reviews - ${title}`,
  }
}
export default async function DetailReviews({
  params,
  searchParams,
}: DetailReviewsProps) {
  const { results, page, total_pages } = await tmdb.movie.reviews({
    id: params.id,
    page: searchParams.page,
  })

  if (!results.length) return <div className="empty-box">No reviews</div>

  return (
    <section className="space-y-4">
      {results.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      <ListPagination currentPage={page} totalPages={total_pages} />
    </section>
  )
}