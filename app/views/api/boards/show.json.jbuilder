json.(@board, :id, :title)

json.lists @board.lists do |list|
  json.extract! list, :id, :title, :ord, :created_at, :updated_at

  json.cards list.cards do |card|
    json.extract! card, :id, :title, :ord, :created_at, :updated_at
  end
end
