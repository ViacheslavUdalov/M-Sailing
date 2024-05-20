using Api.Helpers;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class MainController: BaseApiController
{
    private readonly IProductsRepository<Product> _productsRepository;

    public MainController(IProductsRepository<Product> productsRepository)
    {
        _productsRepository = productsRepository;
    }
    [HttpGet("equipment")]
    public async Task<ActionResult<Pagination<Product>>> GetAllEquipment([FromQuery] ProductSpecParams productSpecParams)
    {
        return await GetProductsByCategory("Equipment", productSpecParams);
    }

    [HttpGet("random-equipment")]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetRandomEquipment()
    {
        var equipment = await GetRandomProducts(4, "Equipment");
        return Ok(equipment);
    }
    [HttpGet("random-armament")]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetRandomArmament()
    {
        var armament = await GetRandomProducts(4, "Armament");
        return Ok(armament);
    }

    [HttpGet("armament")]
    public async Task<ActionResult<Pagination<Product>>> GetAllArmament([FromQuery] ProductSpecParams productSpecParams)
    {
        return await GetProductsByCategory("Armament", productSpecParams);
    }
    [HttpGet("covers")]
    public async Task<ActionResult<Pagination<Product>>> GetAllCovers([FromQuery] ProductSpecParams productSpecParams)
    {
        return await GetProductsByCategory("Covers", productSpecParams);
    }
    [HttpGet("boats")]
    public async Task<ActionResult<Pagination<Product>>> GetAllBoats([FromQuery] ProductSpecParams productSpecParams)
    {
        return await GetProductsByCategory("Boats", productSpecParams);
    }
    [HttpGet("clothes")]
    public async Task<ActionResult<Pagination<Product>>> GetAllClothes([FromQuery] ProductSpecParams productSpecParams)
    {
        return await GetProductsByCategory("Clothes", productSpecParams);
    }
    
    [HttpGet("equipment/{id}")]
    public async Task<ActionResult<Product>> GetOneEquipment(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest();
        }
        var equipment =  await _productsRepository.GetByIdAsync("Equipment", id);
        if (equipment is null)
        {
            return NotFound();
        }
        return equipment;
    }
    
    [HttpGet("boats/{id}")]
    public async Task<ActionResult<Product>> GetOneBoats(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest();
        }
        var boats =  await _productsRepository.GetByIdAsync("Boats", id);
        if (boats is null)
        {
            return NotFound();
        }
        return boats;
    }
      
    [HttpGet("clothes/{id}")]
    public async Task<ActionResult<Product>> GetOneClothes(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest();
        }
        var clothes =  await _productsRepository.GetByIdAsync("Clothes", id);
        if (clothes is null)
        {
            return NotFound();
        }
        return clothes;
    }
    [HttpGet("armament/{id}")]
    public async Task<ActionResult<Product>> GetOneArmament(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest();
        }
        var armament =  await _productsRepository.GetByIdAsync("Armament", id);
        if (armament is null)
        {
            return NotFound();
        }
        return armament;
    }
    
    [HttpGet("covers/{id}")]
    public async Task<ActionResult<Product>> GetOneCover(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest();
        }
        var cover =  await _productsRepository.GetByIdAsync("Covers", id);
        if (cover is null)
        {
            Console.WriteLine($"Document with id {id} not found in collection Covers");
            return NotFound();
        }
        return cover;
    }
    private async Task<ActionResult<Pagination<Product>>> GetProductsByCategory(string category, ProductSpecParams productSpecParams)
    {
        productSpecParams.TypeForBuy = productSpecParams.TypeForBuy?.Replace(".", " ");
        productSpecParams.Type = productSpecParams.Type?.Replace(".", " ");
        var spec = new ProductsWithFilterSpec(productSpecParams);
        var countSpec = new ProductsWithFiltersCountSpec(productSpecParams);
        var totalItems = await _productsRepository.CountAsync(countSpec, category);
        var products = await _productsRepository.ListWithSpecAsync(spec, category);
        return Ok(
            new Pagination<Product>(productSpecParams.PageIndex, productSpecParams.PageSize, totalItems, products));
    }

    private async Task<IReadOnlyList<Product>> GetRandomProducts(int count, string collectionName)
    {
        var specFilters = new ProductSpecParams();
        var spec = new ProductsWithFilterSpec(specFilters);
        var totalItems = await _productsRepository.CountAsync(spec, collectionName);
        var random = new Random();
        var randomSkip = random.Next(0, totalItems - count);
        var filters = new RandomSpec(randomSkip, count);
        var products = await _productsRepository.ListWithSpecAsync(filters, collectionName);
        return products;
    }
}