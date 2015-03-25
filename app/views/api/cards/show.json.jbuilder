json.(@card, :id, :title)

json.items @card.items do |item|
  json.extract! item, :id, :title, :done, :created_at, :updated_at
end
