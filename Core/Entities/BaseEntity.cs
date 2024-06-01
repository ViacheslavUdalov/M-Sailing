using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Entities;

public class BaseEntity
{
    public int Id { get; set; }
   
}