using Api.Helpers;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class MainController: BaseApiController
{
    private readonly IProductsRepository _productsRepository;
    private readonly UrlResolver _urlResolver;
    
    public MainController(IProductsRepository productsRepository,  UrlResolver urlResolver)
    {
        _productsRepository = productsRepository;
        _urlResolver = urlResolver;
    }
    
    
    [HttpGet("random-equipment")]
    public async Task<ActionResult<IReadOnlyList<Equipment>>> GetRandomEquipment()
    {
        int count = 4;
        var specFilters = new ProductSpecParams();
        var spec = new ProductsWithFilterSpec<Equipment>(specFilters);
        var totalItems = await _productsRepository.CountEquipAsync(spec);
        var random = new Random();
        var randomSkip = random.Next(0, totalItems - count);
        var filters = new RandomSpec<Equipment>(randomSkip, count);
        var products = await _productsRepository.ListEquipWithSpecAsync(filters);
        foreach (var product in products)
        {
            product.Pictures = _urlResolver.Resolve(product.Pictures);
        }
        return Ok(products);
    }
    [HttpGet("random-armament")]
    public async Task<ActionResult<IReadOnlyList<Armament>>> GetRandomArmament()
    {
        int count = 4;
        var specFilters = new ProductSpecParams();
        var spec = new ProductsWithFilterSpec<Armament>(specFilters);
        var countSpec = new ProductsWithFiltersCountSpec<Armament>(specFilters);
        var totalItems = await _productsRepository.CountArmamAsync(countSpec);
        var random = new Random();
        var randomSkip = random.Next(0, totalItems - count);
        var filters = new RandomSpec<Armament>(randomSkip, count);
        var products = await _productsRepository.ListArmamWithSpecAsync(filters);
        foreach (var product in products)
        {
            product.Pictures = _urlResolver.Resolve(product.Pictures);
        }
        return Ok(products);
    }
    [HttpGet("equipment")]
    public async Task<ActionResult<Pagination<Equipment>>> GetAllEquipment([FromQuery] ProductSpecParams productSpecParams)
    {
        productSpecParams.TypeForBuy = productSpecParams.TypeForBuy?.Replace(".", " ");
        productSpecParams.Type = productSpecParams.Type?.Replace(".", " ");
        var spec = new ProductsWithFilterSpec<Equipment>(productSpecParams);
        var countSpec = new ProductsWithFiltersCountSpec<Equipment>(productSpecParams);
        var totalItems = await _productsRepository.CountEquipAsync(countSpec);
        var products = await _productsRepository.ListEquipWithSpecAsync(spec);
        foreach (var product in products)
        {
            product.Pictures = _urlResolver.Resolve(product.Pictures);
        }
        return Ok(
            new Pagination<Equipment>(productSpecParams.PageIndex, productSpecParams.PageSize, totalItems, products));
    }

    [HttpGet("armament")]
    public async Task<ActionResult<Pagination<Armament>>> GetAllArmament([FromQuery] ProductSpecParams productSpecParams)
    {
        productSpecParams.TypeForBuy = productSpecParams.TypeForBuy?.Replace(".", " ");
        productSpecParams.Type = productSpecParams.Type?.Replace(".", " ");
        var spec = new ProductsWithFilterSpec<Armament>(productSpecParams);
        var countSpec = new ProductsWithFiltersCountSpec<Armament>(productSpecParams);
        var totalItems = await _productsRepository.CountArmamAsync(countSpec);
        var products = await _productsRepository.ListArmamWithSpecAsync(spec);
        foreach (var product in products)
        {
            product.Pictures = _urlResolver.Resolve(product.Pictures);
        }
        return Ok(
            new Pagination<Armament>(productSpecParams.PageIndex, productSpecParams.PageSize, totalItems, products));
    }
    [HttpGet("covers")]
    public async Task<ActionResult<Pagination<Covers>>> GetAllCovers([FromQuery] ProductSpecParams productSpecParams)
    {
        productSpecParams.TypeForBuy = productSpecParams.TypeForBuy?.Replace(".", " ");
        productSpecParams.Type = productSpecParams.Type?.Replace(".", " ");
        var spec = new ProductsWithFilterSpec<Covers>(productSpecParams);
        var countSpec = new ProductsWithFiltersCountSpec<Covers>(productSpecParams);
        var totalItems = await _productsRepository.CountCoversAsync(countSpec);
        var products = await _productsRepository.ListCoversWithSpecAsync(spec);
        foreach (var product in products)
        {
            product.Pictures = _urlResolver.Resolve(product.Pictures);
        }
        return Ok(
            new Pagination<Covers>(productSpecParams.PageIndex, productSpecParams.PageSize, totalItems, products));
    }
    [HttpGet("boats")]
    public async Task<ActionResult<Pagination<Boats>>> GetAllBoats([FromQuery] ProductSpecParams productSpecParams)
    {
        productSpecParams.TypeForBuy = productSpecParams.TypeForBuy?.Replace(".", " ");
        productSpecParams.Type = productSpecParams.Type?.Replace(".", " ");
        var spec = new ProductsWithFilterSpec<Boats>(productSpecParams);
        var countSpec = new ProductsWithFiltersCountSpec<Boats>(productSpecParams);
        var totalItems = await _productsRepository.CountBoatsAsync(countSpec);
        var products = await _productsRepository.ListBoatsWithSpecAsync(spec);
        foreach (var product in products)
        {
            product.Pictures = _urlResolver.Resolve(product.Pictures);
        }
        return Ok(
            new Pagination<Boats>(productSpecParams.PageIndex, productSpecParams.PageSize, totalItems, products));
    }
    [HttpGet("clothes")]
    public async Task<ActionResult<Pagination<Clothes>>> GetAllClothes([FromQuery] ProductSpecParams productSpecParams)
    {
        productSpecParams.TypeForBuy = productSpecParams.TypeForBuy?.Replace(".", " ");
        productSpecParams.Type = productSpecParams.Type?.Replace(".", " ");
        var spec = new ProductsWithFilterSpec<Clothes>(productSpecParams);
        var countSpec = new ProductsWithFiltersCountSpec<Clothes>(productSpecParams);
        var totalItems = await _productsRepository.CountClothesAsync(countSpec);
        var products = await _productsRepository.ListClothesWithSpecAsync(spec);
        foreach (var product in products)
        {
            product.Pictures = _urlResolver.Resolve(product.Pictures);
        }
        return Ok(
            new Pagination<Clothes>(productSpecParams.PageIndex, productSpecParams.PageSize, totalItems, products));
    }
    
    [HttpGet("equipment/{id}")]
    public async Task<ActionResult<Equipment>> GetOneEquipment(int id)
    {
        var equipment = await _productsRepository.GetEquipByIdAsync(id);
        equipment.Pictures = _urlResolver.Resolve(equipment.Pictures);
        if (equipment == null)
        {
            return NotFound();
        }
        return Ok(equipment);
    }
    
    [HttpGet("boats/{id}")]
    public async Task<ActionResult<Boats>> GetOneBoats(int id)
    {
        var boat = await _productsRepository.GetBoatsByIdAsync(id);
        boat.Pictures = _urlResolver.Resolve(boat.Pictures);
        if (boat == null)
        {
            return NotFound();
        }
        return Ok(boat);
    }
      
    [HttpGet("clothes/{id}")]
    public async Task<ActionResult<Clothes>> GetOneClothes(int id)
    {
        var clothes = await _productsRepository.GetClothesByIdAsync(id);
        clothes.Pictures = _urlResolver.Resolve(clothes.Pictures);
        if (clothes == null)
        {
            return NotFound();
        }
        return Ok(clothes);
    }
    [HttpGet("armament/{id}")]
    public async Task<ActionResult<Armament>> GetOneArmament(int id)
    {
        var armament = await _productsRepository.GetArmamByIdAsync(id);
        armament.Pictures = _urlResolver.Resolve(armament.Pictures);
        if (armament == null)
        {
            return NotFound();
        }
        return Ok(armament);
    }
    
    [HttpGet("covers/{id}")]
    public async Task<ActionResult<Covers>> GetOneCover(int id)
    {
        var cover = await _productsRepository.GetCoversByIdAsync(id);
        cover.Pictures = _urlResolver.Resolve(cover.Pictures);
        if (cover == null)
        {
            return NotFound();
        }
        return Ok(cover);
    }
    
}