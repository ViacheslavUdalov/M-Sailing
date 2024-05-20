using MongoDB.Bson.Serialization.Attributes;

namespace Core.Entities;

public class Product : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; }
    [BsonElement("price")]
    public double Price { get; set; }
    [BsonElement("description")]
    public string Description { get; set; }
    [BsonElement("type")]
    public string Type { get; set; }
    [BsonElement("size")]
    public string[]? Size { get; set; }
    [BsonElement("colors")]
    public string[]? Colors { get; set; }
    [BsonElement("pictures")]
    public string Pictures { get; set; }
    [BsonElement("typeForBuy")]
    public string TypeForBuy { get; set; }
}