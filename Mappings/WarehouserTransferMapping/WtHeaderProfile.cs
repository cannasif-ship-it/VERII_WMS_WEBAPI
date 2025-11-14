using AutoMapper;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Mappings
{
    public class WtHeaderProfile : Profile
    {
        public WtHeaderProfile()
        {
            // WtHeader to WtHeaderDto
            CreateMap<WtHeader, WtHeaderDto>()
                .ForMember(dest => dest.CreatedByFullUser, opt => opt.MapFrom(src => src.CreatedByUser != null ? $"{src.CreatedByUser.FirstName} {src.CreatedByUser.LastName}".Trim() : null))
                .ForMember(dest => dest.UpdatedByFullUser, opt => opt.MapFrom(src => src.UpdatedByUser != null ? $"{src.UpdatedByUser.FirstName} {src.UpdatedByUser.LastName}".Trim() : null))
                .ForMember(dest => dest.DeletedByFullUser, opt => opt.MapFrom(src => src.DeletedByUser != null ? $"{src.DeletedByUser.FirstName} {src.DeletedByUser.LastName}".Trim() : null));

            // CreateWtHeaderDto to WtHeader
            CreateMap<CreateWtHeaderDto, WtHeader>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedBy, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedDate, opt => opt.Ignore())
                .ForMember(dest => dest.Lines, opt => opt.Ignore())
                .ForMember(dest => dest.ImportLines, opt => opt.Ignore());

            // UpdateWtHeaderDto to WtHeader
            CreateMap<UpdateWtHeaderDto, WtHeader>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Lines, opt => opt.Ignore())
                .ForMember(dest => dest.ImportLines, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedBy, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedDate, opt => opt.Ignore())
                .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}