json.(@card, :id, :title)

json.items @card.items do |item|
  json.extract! item, :id, :title, :done, :ord, :created_at, :updated_at
end
