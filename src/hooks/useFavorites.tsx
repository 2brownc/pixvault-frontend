import { useState, useEffect, useMemo } from "react"

type useFavoritesProps = {
  accessToken: string | null
  userId: string | null
}

export function useFavorites()